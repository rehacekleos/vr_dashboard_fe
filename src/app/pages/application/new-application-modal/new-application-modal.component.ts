import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from "rxjs";
import { NewActivity } from "../../../models/activity.model";
import dayjs from "dayjs";
import { NewApplication } from "../../../models/application.model";
import { ApplicationService } from "../../../shared/services/app/application.service";
import { TranslateComponent } from "../../../shared/translate/translate.component";

@Component({
  selector: 'app-new-application-modal',
  templateUrl: './new-application-modal.component.html',
  styleUrls: ['./new-application-modal.component.scss']
})
export class NewApplicationModalComponent extends TranslateComponent{
  submitForm: Subject<any> = new Subject<any>()

  newApplication: NewApplication = {
    name: "",
    identifier: "",
    setting: ""
  }

  @Input() open: boolean;
  @Output() visibleChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private applicationService: ApplicationService) {
    super()
  }


  visibleChange($event: boolean) {
    this.visibleChanged.emit($event);
  }

  onSubmit() {
    this.submitForm.next(true);
  }


  async onSubmitForm($event: NewApplication) {
    try {
      await this.applicationService.createApplication($event);
      this.visibleChanged.emit(false);
    } catch (e) {
      console.log(e);
    }
  }
}
