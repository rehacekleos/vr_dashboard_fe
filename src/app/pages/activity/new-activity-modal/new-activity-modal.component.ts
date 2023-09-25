import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from "rxjs";
import { NewParticipant } from "../../../models/participant.model";
import { NewActivity } from "../../../models/activity.model";
import dayjs from "dayjs";
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { ActivityService } from "../../../shared/services/app/activity.service";

@Component({
  selector: 'app-new-activity-modal',
  templateUrl: './new-activity-modal.component.html',
  styleUrls: ['./new-activity-modal.component.scss']
})
export class NewActivityModalComponent extends TranslateComponent{

  submitForm: Subject<any> = new Subject<any>()

  newActivity: NewActivity = {
    time: dayjs().format('YYYY-MM-DDTHH:mm'),
    data: "",
    anonymous: false,
    notes: "",
    applicationId: null
  }

  @Input() open: boolean;
  @Output() visibleChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private activityService: ActivityService) {
    super();
  }


  visibleChange($event: boolean) {
    this.visibleChanged.emit($event);
  }

  onSubmit() {
    this.submitForm.next(true);
  }


  async onSubmitForm($event: NewActivity) {
    try {
      await this.activityService.createActivity($event);
      this.visibleChanged.emit(false);
    } catch (e) {
      console.error(e)
    }
  }

}
