import { Component, OnInit } from '@angular/core';
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { ActivatedRoute } from "@angular/router";
import { ActivityService } from "../../../shared/services/app/activity.service";
import { Activity, Record } from "../../../models/activity.model";
import { ParticipantService } from "../../../shared/services/app/participant.service";
import { ApplicationService } from "../../../shared/services/app/application.service";
import { Application } from "../../../models/application.model";
import { Participant } from "../../../models/participant.model";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { CustomTranslateService } from "../../../shared/translate/services/custom-translate.service";
import { Translations } from "../../../shared/translate/translate.model";
import { ChartConfiguration } from "chart.js";
dayjs.extend(duration)

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent extends TranslateComponent implements OnInit{

  activity: Activity;
  applications: Application[];
  participants: Participant[];

  lineChartData: ChartConfiguration['data'] = null;
  lineChartPositionData: ChartConfiguration['data'] = null;
  lineChartOptions: ChartConfiguration['options'] = null;
  lineChartPositionOptions: ChartConfiguration['options'] = null;

  constructor(private route: ActivatedRoute,
              private participantService: ParticipantService,
              private applicationService: ApplicationService,
              private translateService: CustomTranslateService,
              private activityService: ActivityService) {
    super();
  }
  ngOnInit(): void {
    this.participantService.getParticipants().then();
    this.applicationService.getApplications().then();

    this.route.params.subscribe(async p => {
      this.activity = await this.activityService.getActivity(p.activityId);
      this.setChartData(this.activity.data.records);
    })

    this.participantService.$participants.subscribe(p => {
      this.participants = p;
    })

    this.applicationService.$applications.subscribe(a => {
      this.applications = a;
    })
  }

  getParticipant(id: string): Participant {
    return this.participants.find(p => p.id === id);
  }

  getApplication(id: string): Application {
    return this.applications.find(a => a.id === id);
  }

  getDuration() {
    const diffInMs = dayjs(this.activity.data.end).diff(this.activity.data.start)
    return dayjs.duration(diffInMs).format(`m [${this.translateService.instantTranslation(Translations.times.minutes)}] ss [${this.translateService.instantTranslation(Translations.times.seconds)}]`)
  }

  private setChartData(records: Record[]) {
    const head_rotation_x = [];
    const head_rotation_y = [];
    const head_rotation_z = [];

    const head_position = [];

    for (const record of records) {
      head_rotation_x.push({x: record.tick, y: record.head.rotation.x});
      head_rotation_y.push({x: record.tick, y: record.head.rotation.y});
      head_rotation_z.push({x: record.tick, y: record.head.rotation.z});
      head_position.push({x: record.head.position.x, y: record.head.position.y});
    }


    this.lineChartData = {
      datasets: [
        {
          type: "line",
          data: head_rotation_x,
          label: 'Head X-axis rotation',
          backgroundColor: 'transparent',
          fill: 'origin',
        },
        {
          type: "line",
          data: head_rotation_y,
          label: 'Head Y-axis rotation',
          backgroundColor: 'transparent',
          fill: 'origin',
        },
        {
          type: "line",
          data: head_rotation_z,
          label: 'Head Z-axis rotation',
          backgroundColor: 'transparent',
          fill: 'origin',
        }
      ]
    };

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

    this.lineChartOptions = {
      animation: false,
      parsing: false,
      plugins: {
        decimation: {
          enabled: true,
          algorithm: "lttb",
          samples: 20,
          threshold: 50
        }
      },
      scales: {
        x:{
          type: "linear",
          min: 0,
          max: records.length
        },
        y: {
          min: 0,
          max: 365
        }
      }
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
}
