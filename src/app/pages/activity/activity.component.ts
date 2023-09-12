import { Component, OnInit } from '@angular/core';
import { Application } from "../../models/application.model";
import { Activity } from "../../models/activity.model";
import { ActivityService } from "../../shared/services/app/activity.service";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit{

  openModal = false;
  activities: Activity[];

  constructor(private activityService: ActivityService) {
  }

  ngOnInit(): void {
    this.activityService.getActivities()
  }



  modalVisibleChange($event: boolean) {
    this.openModal = $event;
  }


}
