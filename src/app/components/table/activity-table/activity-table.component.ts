import { Component, Input, OnInit } from '@angular/core';
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { Activity } from "../../../models/activity.model";
import dayjs from "dayjs";
import { ApplicationService } from "../../../shared/services/app/application.service";
import { ParticipantService } from "../../../shared/services/app/participant.service";
import { Application } from "../../../models/application.model";
import { Participant } from "../../../models/participant.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.scss']
})
export class ActivityTableComponent extends TranslateComponent implements OnInit {

  @Input() activities: Activity[];
  applications: Application[];
  participants: Participant[];

  constructor(private applicationService: ApplicationService,
              private participantService: ParticipantService,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.applicationService.$applications.subscribe(a => {
      this.applications = a;
    })

    this.participantService.$participants.subscribe(p => {
      this.participants = p;
    })
  }


  async goToDetail(id: string) {
    await this.router.navigate(['activity', id])
  }

  getParticipant(activity: Activity) {
    if (activity.participantId) {
      const participant = this.participants.find(p => p.id = activity.participantId);
      if (participant) {
        return participant.nickname;
      }
    }
    return "";
  }

  getApplication(activity: Activity) {
    if (activity.applicationId) {
      const application = this.applications.find(a => a.id === activity.applicationId);
      if (application) {
        return application.name;
      }
    }
    return "";
  }

  getTime(activity: Activity) {
    return dayjs(activity.time).format("DD.MM.YYYY HH:mm:ss")
  }

}
