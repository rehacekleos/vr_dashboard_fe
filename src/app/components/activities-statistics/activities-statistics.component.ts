import { Component, Input } from '@angular/core';
import { Activity } from "../../models/activity.model";
import dayjs from "dayjs";
import { Translations } from "../../shared/translate/translate.model";
import { TranslateService } from "@ngx-translate/core";
import { CustomTranslateService } from "../../shared/translate/services/custom-translate.service";

@Component({
  selector: 'app-activities-statistics',
  templateUrl: './activities-statistics.component.html',
  styleUrls: ['./activities-statistics.component.scss']
})
export class ActivitiesStatisticsComponent {

  constructor(private translateService: CustomTranslateService) {
  }

  @Input({required: true}) activities: Activity[];

  getTotalTime() {
    let duration = 0;
    for (const activity of this.activities){
      const start = activity.data.start;
      const end = activity.data.end;
      const diffInMs = dayjs(end).diff(start)
      duration += diffInMs;
    }

    return dayjs.duration(duration).format(`m [${this.translateService.instantTranslation(Translations.times.minutes)}] ss [${this.translateService.instantTranslation(Translations.times.seconds)}]`)
  }
}
