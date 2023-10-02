import { Component, OnInit } from '@angular/core';
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { ActivatedRoute } from "@angular/router";
import { ActivityService } from "../../../shared/services/app/activity.service";
import { Activity } from "../../../models/activity.model";

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent extends TranslateComponent implements OnInit{

  activity: Activity;

  constructor(private route: ActivatedRoute,
              private activityService: ActivityService) {
    super();
  }
  ngOnInit(): void {
    this.route.params.subscribe(async p => {
      this.activity = await this.activityService.getActivity(p.activityId);
    })
  }

}
