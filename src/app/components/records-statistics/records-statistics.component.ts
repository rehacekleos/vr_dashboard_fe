import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Record } from "../../models/activity.model";
import dayjs from "dayjs";
import { Translations } from "../../shared/translate/translate.model";
import { TranslateComponent } from "../../shared/translate/translate.component";
import { CustomTranslateService } from "../../shared/translate/services/custom-translate.service";

@Component({
  selector: 'app-records-statistics',
  templateUrl: './records-statistics.component.html',
  styleUrls: ['./records-statistics.component.scss']
})
export class RecordsStatisticsComponent extends TranslateComponent implements OnChanges{

  @Input({required: true}) records: Record[];
  duration: string = "";
  events = 0;

  constructor(private translateService: CustomTranslateService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.records){
      this.getDuration();
      this.getEvents();
    }
  }

  private getDuration(){
    if (this.records.length > 0) {
      const start = this.records[0].timestamp;
      const end = this.records[this.records.length - 1].timestamp;
      const diffInMs = dayjs(end).diff(start)
      this.duration = dayjs.duration(diffInMs).format(`m [min] ss [s]`)
    }
  }

  private getEvents(){
    const recordsWithEvents = this.records.filter(r => r.event);
    this.events = recordsWithEvents.length;
  }



}
