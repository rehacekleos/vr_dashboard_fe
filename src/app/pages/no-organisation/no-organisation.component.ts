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

@Component({
  selector: 'app-no-organisation',
  templateUrl: './no-organisation.component.html',
  styleUrls: ['./no-organisation.component.scss']
})
export class NoOrganisationComponent extends TranslateComponent implements OnInit{

  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
  }


  async goToLogin() {
    await this.authService.logout()
  }
}
