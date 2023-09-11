import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from "rxjs";
import { NewParticipant } from "../../../models/participant.model";
import { NewActivity } from "../../../models/activity.model";
import dayjs from "dayjs";

@Component({
  selector: 'app-new-activity-modal',
  templateUrl: './new-activity-modal.component.html',
  styleUrls: ['./new-activity-modal.component.scss']
})
export class NewActivityModalComponent {

  submitForm: Subject<any> = new Subject<any>()

  newActivity: NewActivity = {
    time: dayjs().format('YYYY-MM-DDTHH:mm'),
    data: "",
    anonymous: false,
    notes: "",
    applicationId: ""
  }

  @Input() open: boolean;
  @Output() visibleChanged: EventEmitter<boolean> = new EventEmitter<boolean>();


  visibleChange($event: boolean) {
    this.visibleChanged.emit($event);
  }

  onSubmit() {
    this.submitForm.next(true);
  }


  onSubmitForm($event: NewActivity) {
    console.log($event);
  }

}
