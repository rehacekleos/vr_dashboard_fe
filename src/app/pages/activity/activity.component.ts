import { Component, OnInit } from '@angular/core';
import { Application } from "../../models/application.model";
import { Activity } from "../../models/activity.model";
import { ActivityService } from "../../shared/services/app/activity.service";
import { TranslateComponent } from "../../shared/translate/translate.component";
import { ApplicationService } from "../../shared/services/app/application.service";
import { ParticipantService } from "../../shared/services/app/participant.service";
import { Participant } from "../../models/participant.model";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent extends TranslateComponent implements OnInit{

  openModal = false;
  activities: Activity[];

  applications: Application[];
  participants: Participant[];

  constructor(private activityService: ActivityService,
              private applicationService: ApplicationService,
              private participantService: ParticipantService) {
    super()
  }

  ngOnInit(): void {
    this.activityService.$activities.subscribe(a => {
      this.activities = a;
    })

    this.applicationService.$applications.subscribe(a => {
      this.applications = a;
    })

    this.participantService.$participants.subscribe(p => {
      this.participants = p;
    })
  }


  modalVisibleChange($event: boolean) {
    this.openModal = $event;
  }


  goToDetail(id: string) {

  }

  getParticipant(activity: Activity) {
    if (activity.participantId) {
      const participant = this.participants.find(p => p.id = activity.participantId);
      if (participant){
        return participant.nickname;
      }
    }
    return "";
  }

  getApplication(activity: Activity) {
    if (activity.applicationId) {
      const application = this.applications.find(a => a.id = activity.applicationId);
      if (application){
        return application.name;
      }
    }
    return "";
  }
}
