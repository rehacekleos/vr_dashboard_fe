import { Component, OnInit } from '@angular/core';
import { Application } from "../../models/application.model";
import { Activity } from "../../models/activity.model";
import { ActivityService } from "../../shared/services/app/activity.service";
import { TranslateComponent } from "../../shared/translate/translate.component";
import { ApplicationService } from "../../shared/services/app/application.service";
import { ParticipantService } from "../../shared/services/app/participant.service";
import { Participant } from "../../models/participant.model";
import dayjs from "dayjs";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent extends TranslateComponent implements OnInit{

  openModal = false;
  activities: Activity[];

  searchValue = "";

  constructor(private activityService: ActivityService) {
    super()
  }

  async ngOnInit(): Promise<void> {
    await this.activityService.getActivities();
    this.activityService.$activities.subscribe(a => {
      this.activities = a;
    })
  }


  modalVisibleChange($event: boolean) {
    this.openModal = $event;
  }

  setSearchValue($event: any) {
    if ($event && $event.trim() !== ""){
      this.searchValue = $event;
    } else if ($event === ""){
      this.searchValue = $event;
    }
  }
}
