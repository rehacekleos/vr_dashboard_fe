import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Application } from "../../../../models/application.model";
import { NgForm } from "@angular/forms";
import { Subject } from "rxjs";
import { NewActivity } from "../../../../models/activity.model";
import dayjs from "dayjs";
import { NewInvitation } from "../../../../models/invitation.model";
import { RoleNames } from "../../../../models/role.model";
import { TranslateComponent } from "../../../../shared/translate/translate.component";

@Component({
  selector: 'app-new-invitation-form',
  templateUrl: './new-invitation-form.component.html',
  styleUrls: ['./new-invitation-form.component.scss']
})
export class NewInvitationFormComponent extends TranslateComponent implements OnInit{
  validated = false;
  roles = Object.values(RoleNames);


  @ViewChild('newInvitationForm') form: NgForm;
  @Input() submit: Subject<any>;
  @Input() newInvitation: NewInvitation;
  @Output() onSubmitForm: EventEmitter<NewInvitation> = new EventEmitter<NewInvitation>();

  ngOnInit(): void {
    this.submit?.subscribe(() => {
      this.form.ngSubmit.emit(true);
    })
  }

  async onSubmit(form: NgForm) {
    this.validated = true;
    if (form.valid) {
      try {
        const newInvitation: NewInvitation = {
          email: form.form.controls['email'].value,
          role: form.form.controls['role'].value,
        }

        this.onSubmitForm.emit(newInvitation);
      } catch (e) {
        this.validated = false;
      }
    }
  }
}
