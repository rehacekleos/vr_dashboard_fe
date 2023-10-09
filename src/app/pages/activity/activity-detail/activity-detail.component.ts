import { Component, OnInit } from '@angular/core';
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityService } from "../../../shared/services/app/activity.service";
import { Activity, CustomDataDisplay, Record } from "../../../models/activity.model";
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

  lineChartPositionData: ChartConfiguration['data'] = null;
  lineChartPositionOptions: ChartConfiguration['options'] = null;
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

        this.setChartData(this.activity.data.records);

        this.customData = this.getCustomData();
      }
    })

  }

  getDuration() {
    const diffInMs = dayjs(this.activity.data.end).diff(this.activity.data.start)
    return dayjs.duration(diffInMs).format(`m [${this.translateService.instantTranslation(Translations.times.minutes)}] ss [${this.translateService.instantTranslation(Translations.times.seconds)}]`)
  }

  private setChartData(records: Record[]) {
    const head_position = [];

    for (const record of records) {
      head_position.push({x: record.head.position.x, y: record.head.position.y});
    }

    this.lineChartPositionData = {
      datasets: [
        {
          type: "line",
          data: head_position,
          label: 'Head position',
          backgroundColor: 'transparent',
          fill: 'origin',
        }
      ]
    }

    this.lineChartPositionOptions = {
      animation: false,
      parsing: false,
      plugins: {
        decimation: {
          enabled: true,
          algorithm: "lttb",
          samples: 20,
          threshold: 50
        },
        tooltip: {
          callbacks: {
            footer: (items) => {
              console.log(items)
              return "Time: " + items[0].dataIndex
            },
          }
        }
      },
      scales: {
        x:{
          type: "linear",
          min: Math.min(...head_position.map(p => p.x)),
          max: Math.max(...head_position.map(p => p.x))
        },
        y: {
          min: Math.min(...head_position.map(p => p.y)),
          max: Math.max(...head_position.map(p => p.y))
        }
      }
    }
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
        console.log(currentLang)
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
}
