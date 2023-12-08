import { Component, OnInit } from '@angular/core';
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityService } from "../../../shared/services/app/activity.service";
import { Activity, CustomDataDisplay, Record, VRData } from "../../../models/activity.model";
import { ParticipantService } from "../../../shared/services/app/participant.service";
import { ApplicationService } from "../../../shared/services/app/application.service";
import { Application, ApplicationSetting } from "../../../models/application.model";
import { Participant } from "../../../models/participant.model";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { CustomTranslateService } from "../../../shared/translate/services/custom-translate.service";
import { Translations } from "../../../shared/translate/translate.model";
import { CustomToastrService } from "../../../shared/services/custom-toastr.service";
import { combineLatest } from "rxjs";
import { DomSanitizer } from "@angular/platform-browser";
import { CustomDataUtils } from "../../../shared/utils/customDataUtils";

dayjs.extend(duration)

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent extends TranslateComponent implements OnInit {

  activity: Activity;
  application: Application;
  participant: Participant;

  customData: CustomDataDisplay[] = [];
  applicationModuleVersion: string;

  environments: string[];
  selectedEnvironment: string;
  environmentsRecords: Record[];

  showModule = false;

  deleteModalOpen = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private participantService: ParticipantService,
              private applicationService: ApplicationService,
              private translateService: CustomTranslateService,
              private toaster: CustomToastrService,
              private activityService: ActivityService) {
    super();
  }

  ngOnInit(): void {
    this.participantService.getParticipants().then();
    this.applicationService.getApplications().then();

    combineLatest([this.route.params, this.participantService.$participants, this.applicationService.$applications]).subscribe(async ([params, participants, applications]) => {
      if (params && applications && participants) {
        this.activity = await this.activityService.getActivity(params.activityId);
        this.participant = participants.find(p => p.id === this.activity.participantId);
        this.application = applications.find(a => a.id === this.activity.applicationId);

        this.getApplicationModuleVersion();
        this.environments = this.getEnvironments(this.activity.data);
        this.selectedEnvironment = this.environments[0];
        this.getEnvRecords();
        this.customData = [...this.getCustomData(), ...this.getRecordsCustomData()];
      }
    })

  }

  getApplicationModuleVersion() {
    const appModules = this.application.modules;
    const appSetting = this.application.setting;
    const logVersion = this.activity.data.log_version.toString();

    if (appSetting.module_version_mapping == null){
      return;
    }
    for (const [key, value] of Object.entries(appSetting.module_version_mapping)){
      if (value.includes(logVersion.toString())){
        if (appModules.includes(key.toString())){
          this.applicationModuleVersion = key;
          return;
        }
      }
    }
  }

  getDuration() {
    const diffInMs = dayjs(this.activity.data.end).diff(this.activity.data.start)
    return dayjs.duration(diffInMs).format(`m [min] ss [s]`)
  }

  async onChangeNote($event: string) {
    try {
      await this.activityService.updateActivityNote(this.activity.id, $event)
      this.toaster.showToastMessage(this.translateService.instantTranslation(Translations.messages.update.note));
    } catch (e) {

    }
  }

  getDeleteMessage() {
    if (this.translateService) {
      return this.translateService.instantTranslation(Translations.confirm.delete.activity);
    }
  }

  async deleteActivity() {
    try {
      await this.activityService.deleteActivity(this.activity.id);
      this.deleteModalOpen = false;
      this.toaster.showToastMessage(this.translateService.instantTranslation(Translations.messages.delete.activity));
      await this.router.navigate(["activity"]);
    } catch (e) {

    }
  }

  closeConfirmModal() {
    this.deleteModalOpen = false;
  }

  openConfirmModal() {
    this.deleteModalOpen = true;
  }

  getCustomData(): CustomDataDisplay[] {
    const settings = this.application.setting as ApplicationSetting;
    const data = this.activity?.data?.custom_data;

    // Check if application has set custom data and activity has custom data
    if (settings?.custom_data && data) {
      const res: CustomDataDisplay[] = [];
      const currentLang = this.translateService.currentLang;
      for (const set of settings.custom_data) {
        res.push({
          title: set.languages[currentLang],
          value: data[set.path]
        })
      }
      return res;
    } else {
      return [];
    }
  }

  getRecordsCustomData(): CustomDataDisplay[] {
    const settings = this.application.setting as ApplicationSetting;

    // Check if application has set record custom data
    if (settings.records_custom_data && settings.records_custom_data.length > 0) {
      const res: CustomDataDisplay[] = [];
      const currentLang = this.translateService.currentLang;
      for (const set of settings.records_custom_data) {
        // Record custom data only accept number values
        let value: number = 0;
        const values = this.environmentsRecords.filter(r => r.custom_data && r.custom_data[set.path] && typeof r.custom_data[set.path] === "number").map(r => r.custom_data[set.path]);
        if (values.length > 0){
          switch (set.type){
            case "avg":
              value = CustomDataUtils.getAvgValue(values);
              break;
            case "sum":
              value = CustomDataUtils.getSumValue(values);
              break;
            case "min":
              value = CustomDataUtils.getMinValue(values);
              break;
            case "max":
              value = CustomDataUtils.getMaxValue(values);
              break;
            default:
              continue;
          }
        }
        res.push({
          title: set.languages[currentLang],
          value: value.toFixed(2)
        });
      }
      return res;
    } else {
      return [];
    }
  }

  private getEnvironments(data: VRData) {
    const environments = new Set<string>();

    for (const record of data.records) {
      environments.add(record.environment);
    }

    return Array.from(environments);
  }

  private getEnvRecords() {
    this.environmentsRecords = this.activity.data.records.filter(r => r.environment === this.selectedEnvironment);
  }

  changeEnvironment() {
    this.showModule = false;
    this.getEnvRecords();
  }

  onToggleModule() {
    this.showModule = !this.showModule;
  }
}
