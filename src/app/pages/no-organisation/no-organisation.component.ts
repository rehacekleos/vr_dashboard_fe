import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { LoginUser } from "../../models/auth.model";
import { NewOrganisation } from "../../models/organisation.model";
import { AcceptInvitation } from "../../models/invitation.model";
import { User } from "../../models/user.model";
import { AuthService } from "../../auth/auth.service";
import { OrganisationService } from "../../shared/services/app/organisation.service";
import { Router } from "@angular/router";
import { InvitationService } from "../../shared/services/app/invitation.service";

@Component({
  selector: 'app-no-organisation',
  templateUrl: './no-organisation.component.html',
  styleUrls: ['./no-organisation.component.scss']
})
export class NoOrganisationComponent implements OnInit{

  createValidated = false;
  createError: string = null;

  joinValidated = false;
  joinError: string = null;

  user: User;

  constructor(private authService: AuthService,
              private orgService: OrganisationService,
              private invitationService: InvitationService,
              private router: Router) {
  }

  ngOnInit(): void {
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
        console.log(e)
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


  async goToLogin() {
    await this.authService.logout()
  }
}
