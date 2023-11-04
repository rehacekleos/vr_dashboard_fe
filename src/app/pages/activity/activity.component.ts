import { Component, OnInit } from '@angular/core';
import { Activity } from "../../models/activity.model";
import { ActivityService } from "../../shared/services/app/activity.service";
import { TranslateComponent } from "../../shared/translate/translate.component";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent extends TranslateComponent implements OnInit{

  openModal = false;
  activities: Activity[];

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
}
