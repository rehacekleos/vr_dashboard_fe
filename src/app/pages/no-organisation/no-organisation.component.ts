import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { LoginUser } from "../../models/auth.model";
import { NewOrganisation } from "../../models/organisation.model";
import { AcceptInvitation } from "../../models/invitation.model";
import { User } from "../../models/user.model";
import { AuthService } from "../../auth/auth.service";
import { OrganisationService } from "../../shared/services/app/organisation.service";
import { Router } from "@angular/router";
import { InvitationService } from "../../shared/services/app/invitation.service";
import { TranslateComponent } from "../../shared/translate/translate.component";
import { Subject } from "rxjs";

@Component({
  selector: 'app-no-organisation',
  templateUrl: './no-organisation.component.html',
  styleUrls: ['./no-organisation.component.scss']
})
export class NoOrganisationComponent extends TranslateComponent implements OnInit{

  newOrg: NewOrganisation = {
    name: ""
  }
  submitCreate: Subject<any> = new Subject<any>();
  createActive = false;
  createError: string = null;


  acceptInv: AcceptInvitation = {
    code: ""
  }
  submitJoin: Subject<any> = new Subject<any>();
  joinActive = false;
  joinError: string = null;

  constructor(private authService: AuthService,
              private orgService: OrganisationService,
              private invitationService: InvitationService,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
  }


  async goToLogin() {
    await this.authService.logout()
  }

  joinOrg() {
    this.submitJoin.next(true);
  }

  createOrg() {
    this.submitCreate.next(true);
  }

  async onJoinSubmit($event: AcceptInvitation) {
    this.joinActive = true;
    try {
      await this.invitationService.acceptInvitation($event);
      this.joinActive = false;
      await this.router.navigate([""], {fragment: "confirmInvitation"});
    } catch (e) {
      this.joinActive = false;
      this.joinError = e.error.message;
    }
  }

  async onCreateSubmit($event: NewOrganisation) {
    this.createActive = true;
    try {
      await this.orgService.createOrganisation($event, this.authService.getCurrentUser());
      this.createActive = false;
      await this.router.navigate([""], {fragment: "confirmInvitation"});
    } catch (e) {
      this.createActive = false;
      this.createError = e.error.message;
    }
  }
}
