import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NewOrganisation } from "../../models/organisation.model";
import { AcceptInvitation } from "../../models/invitation.model";
import { AuthService } from "../../auth/auth.service";
import { OrganisationService } from "../../shared/services/app/organisation.service";
import { InvitationService } from "../../shared/services/app/invitation.service";
import { Router } from "@angular/router";
import { TranslateComponent } from "../../shared/translate/translate.component";
import { Subject } from "rxjs";
import { NewActivity } from "../../models/activity.model";

@Component({
  selector: 'app-create-organisation-form',
  templateUrl: './create-organisation-form.component.html',
  styleUrls: ['./create-organisation-form.component.scss']
})
export class CreateOrganisationFormComponent extends TranslateComponent{

  @Input() submit: Subject<any>;
  @Input() newOrganisation: NewOrganisation;
  @Output() onSubmitForm: EventEmitter<NewOrganisation> = new EventEmitter<NewOrganisation>();
  @ViewChild('createForm') form: NgForm;

  createValidated = false;
  constructor() {
    super()
  }
  ngOnInit(): void {
    this.submit?.subscribe(() => {
      this.form.ngSubmit.emit(true);
    })
  }

  async onSubmit(form: NgForm) {
    this.createValidated = true;
    if (form.valid) {
      try {
        this.onSubmitForm.emit(this.newOrganisation);
      } catch (e: any) {
        this.createValidated = false;
      }
    }
  }

}
