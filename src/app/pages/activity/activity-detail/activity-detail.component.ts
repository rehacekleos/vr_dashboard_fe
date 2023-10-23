import { Component, OnInit } from '@angular/core';
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityService } from "../../../shared/services/app/activity.service";
import { Activity, CustomDataDisplay, Record, VRData } from "../../../models/activity.model";
import { ParticipantService } from "../../../shared/services/app/participant.service";
import { ApplicationService } from "../../../shared/services/app/application.service";
import { Application } from "../../../models/application.model";
import { Participant } from "../../../models/participant.model";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { CustomTranslateService } from "../../../shared/translate/services/custom-translate.service";
import { Translations } from "../../../shared/translate/translate.model";
import { ChartConfiguration } from "chart.js";
import { CustomToastrService } from "../../../shared/services/custom-toastr.service";
import { combineLatest } from "rxjs";
import { environment } from "../../../../environments/environment";
import { DomSanitizer } from "@angular/platform-browser";
dayjs.extend(duration)

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent extends TranslateComponent implements OnInit{

  activity: Activity;
  application: Application;
  participant: Participant;

  customData: CustomDataDisplay[] = [];

  environments: string[];
  selectedEnvironment: string;
  environmentsRecords: Record[];

  showModule = false;

  deleteModalOpen = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer,
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

        this.environments = this.getEnvironments(this.activity.data);
        this.selectedEnvironment = this.environments[0];
        this.getEnvRecords();
        this.customData = this.getCustomData();
      }
    })

  }

  getDuration() {
    const diffInMs = dayjs(this.activity.data.end).diff(this.activity.data.start)
    return dayjs.duration(diffInMs).format(`m [${this.translateService.instantTranslation(Translations.times.minutes)}] ss [${this.translateService.instantTranslation(Translations.times.seconds)}]`)
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

  hasCustomData(){
    return this.activity.data.custom_data && this.application?.setting && this.application?.setting !== ""
  }

  getCustomData(): CustomDataDisplay[]  {
    if (this.hasCustomData()){
      const settings = this.application.setting;
      if (settings.custom_data){
        const res: CustomDataDisplay[] = [];
        const data = this.activity.data.custom_data;
        const currentLang = this.translateService.currentLang;
        for (const set of settings.custom_data){
          res.push({
            title: set.languages[currentLang],
            value: data[set.path]
          })
        }
        return res;
      } else {
        return [];
      }

    } else {
      return [];
    }
  }

  private getEnvironments(data: VRData) {
    const environments = new Set<string>();

    for (const record of data.records){
      environments.add(record.environment);
    }

    return Array.from(environments);
  }

  private getEnvRecords() {
    this.environmentsRecords = this.activity.data.records.filter(r => r.environment === this.selectedEnvironment);
  }

  getEnvDuration() {
    if (this.environmentsRecords) {
      const start = this.environmentsRecords[0].timestamp;
      const end = this.environmentsRecords[this.environmentsRecords.length - 1].timestamp;
      const diffInMs = dayjs(end).diff(start)
      return dayjs.duration(diffInMs).format(`m [${this.translateService.instantTranslation(Translations.times.minutes)}] ss [${this.translateService.instantTranslation(Translations.times.seconds)}]`)
    }
  }

  changeEnvironment() {
    this.showModule = false;
    this.getEnvRecords();
  }

  onToggleModule() {
    this.showModule = !this.showModule;
  }
}
