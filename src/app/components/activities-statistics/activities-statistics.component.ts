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
    for (const activity of this.activities){
      const start = activity.data.start;
      const end = activity.data.end;
      const diffInMs = dayjs(end).diff(start)
      totalDuration += diffInMs;
    }

    this.totalDuration = dayjs.duration(totalDuration).format(`m [min] ss [s]`)
    this.avgDuration = dayjs.duration(totalDuration / this.activities.length).format(`m [min] ss [s]`)
  }

  protected readonly TranslateService = TranslateService;
}
