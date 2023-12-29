import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from "rxjs";
import { NewActivity } from "../../../models/activity.model";
import dayjs from "dayjs";
import { NewApplication } from "../../../models/application.model";
import { ApplicationService } from "../../../shared/services/app/application.service";
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { AuthService } from "../../../auth/auth.service";
import { CustomTranslateService } from "../../../shared/translate/services/custom-translate.service";
import { CustomToastrService } from "../../../shared/services/custom-toastr.service";
import { Translations } from "../../../shared/translate/translate.model";

@Component({
  selector: 'app-new-application-modal',
  templateUrl: './new-application-modal.component.html',
  styleUrls: ['./new-application-modal.component.scss']
})
export class NewApplicationModalComponent extends TranslateComponent {
  submitForm: Subject<any> = new Subject<any>()

  newApplication: NewApplication = {
    name: "",
    identifier: "",
    setting: ""
  }

  @Input() open: boolean;
  @Output() visibleChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private applicationService: ApplicationService,
              private translateService: CustomTranslateService,
              private toaster: CustomToastrService,
              private authService: AuthService) {
    super()
  }


  visibleChange($event: boolean) {
    this.visibleChanged.emit($event);
    this.newApplication = {
      name: "",
      identifier: "",
      setting: ""
    };
  }

  onSubmit() {
    this.submitForm.next(true);
  }


  async onSubmitForm($event: NewApplication) {
    try {
      const app = await this.applicationService.createApplication($event, this.authService.getCurrentUser());
      this.toaster.showToastMessage(this.translateService.instantTranslation(Translations.messages.created.application_$, {param: app.name}));
      this.visibleChanged.emit(false);
    } catch (e) {
      console.error(e);
    }
  }
}
