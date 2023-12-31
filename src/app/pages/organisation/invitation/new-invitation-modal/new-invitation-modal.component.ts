import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from "rxjs";
import { NewActivity } from "../../../../models/activity.model";
import dayjs from "dayjs";
import { NewInvitation } from "../../../../models/invitation.model";
import { RoleNames } from "../../../../models/role.model";
import { InvitationService } from "../../../../shared/services/app/invitation.service";
import { ToastrService } from "ngx-toastr";
import { CustomToastrService } from "../../../../shared/services/custom-toastr.service";
import { TranslateComponent } from "../../../../shared/translate/translate.component";
import { CustomTranslateService } from "../../../../shared/translate/services/custom-translate.service";
import { Translations } from "../../../../shared/translate/translate.model";

@Component({
  selector: 'app-new-invitation-modal',
  templateUrl: './new-invitation-modal.component.html',
  styleUrls: ['./new-invitation-modal.component.scss']
})
export class NewInvitationModalComponent extends TranslateComponent{

  submitForm: Subject<any> = new Subject<any>()
  error: string;

  newInvitation: NewInvitation = {
    email: '',
    role: RoleNames.EMPLOYEE
  }

  @Input() open: boolean;
  @Output() visibleChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private inviteService: InvitationService,
              private translateService: CustomTranslateService,
              private toastr: CustomToastrService) {
    super();
  }

  visibleChange($event: boolean) {
    this.visibleChanged.emit($event);
  }

  onSubmit() {
    this.submitForm.next(true);
  }

  async onSubmitForm($event: NewInvitation) {
    try {
      const res = await this.inviteService.createInvitation($event);
      this.error = null;
      this.toastr.showToastMessage(this.translateService.instantTranslation(Translations.messages.created.invitation_$, {param: res.code}), 10000);
      this.visibleChanged.emit(false);
    } catch (e) {
      console.error(e);
      this.error = e.error.message;
    }
  }
}
