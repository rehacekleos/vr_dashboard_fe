import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { AuthService } from "../../../auth/auth.service";
import { OrganisationService } from "../../../shared/services/app/organisation.service";
import { InvitationService } from "../../../shared/services/app/invitation.service";
import { Router } from "@angular/router";
import { AcceptInvitation } from "../../../models/invitation.model";
import { Subject } from "rxjs";

@Component({
  selector: 'app-join-organisation-modal',
  templateUrl: './join-organisation-modal.component.html',
  styleUrls: ['./join-organisation-modal.component.scss']
})
export class JoinOrganisationModalComponent extends TranslateComponent{

  @Input() open: boolean;
  @Output() visibleChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  acceptInv: AcceptInvitation = {
    code: ""
  }
  submitJoin: Subject<any> = new Subject<any>();
  joinActive = false;
  joinError: string = null;

  constructor(private invitationService: InvitationService,
              private router: Router) {
    super();
  }

  visibleChange($event: boolean) {
    this.visibleChanged.emit($event);
  }

  joinOrg() {
    this.submitJoin.next(true);
  }

  async onJoinSubmit($event: AcceptInvitation) {
    this.joinActive = true;
    try {
      await this.invitationService.acceptInvitation($event);
      this.joinActive = false;
      await this.router.navigate([""]);
    } catch (e) {
      this.joinActive = false;
      this.joinError = e.error.message;
    }
  }
}
