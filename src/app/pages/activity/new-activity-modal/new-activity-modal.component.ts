import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from "rxjs";
import { NewParticipant } from "../../../models/participant.model";
import { NewActivity } from "../../../models/activity.model";
import dayjs from "dayjs";
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { ActivityService } from "../../../shared/services/app/activity.service";
import { Route, Router } from "@angular/router";

@Component({
  selector: 'app-new-activity-modal',
  templateUrl: './new-activity-modal.component.html',
  styleUrls: ['./new-activity-modal.component.scss']
})
export class NewActivityModalComponent extends TranslateComponent{

  submitForm: Subject<any> = new Subject<any>()

  newActivity: NewActivity = {
    data: null,
    anonymous: false,
    notes: "",
    applicationId: null
  }

  @Input() open: boolean;
  @Output() visibleChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private activityService: ActivityService,
              private router: Router) {
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
      const activity = await this.activityService.createActivity($event);
      this.visibleChanged.emit(false);
      await this.router.navigate(["/activity", activity.id]);
    } catch (e) {
      console.error(e)
    }
  }

}
