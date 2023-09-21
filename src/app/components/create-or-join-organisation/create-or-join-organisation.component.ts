import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { NewOrganisation } from "../../models/organisation.model";
import { AcceptInvitation } from "../../models/invitation.model";
import { AuthService } from "../../auth/auth.service";
import { OrganisationService } from "../../shared/services/app/organisation.service";
import { InvitationService } from "../../shared/services/app/invitation.service";
import { Router } from "@angular/router";
import { TranslateComponent } from "../../shared/translate/translate.component";

@Component({
  selector: 'app-create-or-join-organisation',
  templateUrl: './create-or-join-organisation.component.html',
  styleUrls: ['./create-or-join-organisation.component.scss']
})
export class CreateOrJoinOrganisationComponent extends TranslateComponent{

  createValidated = false;
  createError: string = null;

  joinValidated = false;
  joinError: string = null;

  constructor(private orgService: OrganisationService,
              private invitationService: InvitationService,
              private router: Router) {
    super()
  }


  async onCreateSubmit(form: NgForm) {
    this.createValidated = true;
    if (form.valid) {
      const newOrg: NewOrganisation = {
        name: form.form.controls['name'].value
      }

      try {
        await this.orgService.createOrganisation(newOrg);
        await this.router.navigate(['']);
      } catch (e: any) {
        this.createValidated = false;
        this.createError = e.error.message;
      }
    }
  }

  async onJoinSubmit(form: NgForm) {
    this.joinValidated = true;
    if (form.valid) {
      const join: AcceptInvitation = {
        code: form.form.controls['code'].value,
      }
      try {
        await this.invitationService.acceptInvitation(join);
        await this.router.navigate(['']);
      } catch (e: any) {
        this.joinValidated = false;
        this.joinError = e.error.message;
      }
    }
  }


}
