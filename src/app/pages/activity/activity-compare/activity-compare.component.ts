import { Component, OnInit } from '@angular/core';
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { ActivityService } from "../../../shared/services/app/activity.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Activity, Record, VRData } from "../../../models/activity.model";
import dayjs from "dayjs";
import { ParticipantService } from "../../../shared/services/app/participant.service";
import { ApplicationService } from "../../../shared/services/app/application.service";
import { combineLatest } from "rxjs";
import { Application } from "../../../models/application.model";
import { Participant } from "../../../models/participant.model";

@Component({
  selector: 'app-activity-compare',
  templateUrl: './activity-compare.component.html',
  styleUrls: ['./activity-compare.component.scss']
})
export class ActivityCompareComponent extends TranslateComponent implements OnInit{
  loaded = false;

  activities: Activity[];
  applications: Application[];
  participants: Participant[];

  environments: string[];
  selectedEnvironment: string;
  environmentsRecords: Record[][];

  constructor(private activityService: ActivityService,
              private participantService: ParticipantService,
              private applicationService: ApplicationService,
              private route: ActivatedRoute) {
    super();
  }
  ngOnInit(): void {
    this.participantService.getParticipants().then();
    this.applicationService.getApplications().then();

    combineLatest([this.route.queryParams, this.participantService.$participants, this.applicationService.$applications]).subscribe(async ([p , participants, applications]) => {
      if (p && participants && applications){
        this.applications = applications;
        this.participants = participants;

        let ids = p.ids;
        if (ids) {
          ids = JSON.parse(ids);
        } else {
          ids = [];
        }

        this.activities = await this.activityService.getActivitiesByIds(ids);
        this.environments = this.getEnvironments(this.activities);
        this.selectedEnvironment = this.environments[0];
        this.getEnvRecords();
        this.loaded = true;
      }

    })
  }

  private getEnvironments(activities: Activity[]) {
    const environments = new Set<string>();

    for (const activity of activities){
      for (const record of activity?.data?.records){
        environments.add(record.environment);
      }
    }

    return Array.from(environments);
  }

  private getEnvRecords() {
    this.environmentsRecords = [];
    for (const activity of this.activities){
      const records = activity.data.records.filter(r => r.environment === this.selectedEnvironment);
      this.environmentsRecords.push(records);
    }
  }

  changeEnvironment() {
    this.getEnvRecords();
  }

  getDuration(activity: Activity) {
    const diffInMs = dayjs(activity.data.end).diff(activity.data.start)
    return dayjs.duration(diffInMs).format(`m [min] ss [s]`)
  }

  getColClass() {
    return `col-${12/this.activities.length}`;
  }

  getParticipant(activity: Activity): Participant {
    return this.participants.find(p => p.id === activity.participantId);
  }

  getApplication(activity: Activity): Application {
    return this.applications.find(p => p.id === activity.applicationId);
  }
}
