import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Activity } from "../../models/activity.model";
import dayjs from "dayjs";
import { Translations } from "../../shared/translate/translate.model";
import { TranslateService } from "@ngx-translate/core";
import { CustomTranslateService } from "../../shared/translate/services/custom-translate.service";
import duration from "dayjs/plugin/duration";
import { TranslateComponent } from "../../shared/translate/translate.component";

@Component({
  selector: 'app-activities-statistics',
  templateUrl: './activities-statistics.component.html',
  styleUrls: ['./activities-statistics.component.scss']
})
export class ActivitiesStatisticsComponent extends TranslateComponent implements OnChanges{

  totalDuration = "";
  avgDuration = "";
  lastActivityBefore = "";

  constructor(private translateService: CustomTranslateService) {
    super()
  }

  @Input({required: true}) activities: Activity[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activities){
      this.getStatistics();
    }
  }

  getStatistics() {
    let totalDuration = 0;
    let avg = 0;
    for (const activity of this.activities){
      const start = activity.data.start;
      const end = activity.data.end;
      const diffInMs = dayjs(end).diff(start)
      totalDuration += diffInMs;
    }

    if (this.activities.length){
      avg = totalDuration / this.activities.length
    }
    this.totalDuration = dayjs.duration(totalDuration).format(`m [min] s [s]`)
    this.avgDuration = dayjs.duration(avg).format(`m [min] s [s]`)
    if (this.activities.length > 0) {
      this.lastActivityBefore = dayjs.duration(dayjs().diff(this.activities[0].data.start)).format(`D [d] H [h]`)
    }
  }

  protected readonly TranslateService = TranslateService;
}
