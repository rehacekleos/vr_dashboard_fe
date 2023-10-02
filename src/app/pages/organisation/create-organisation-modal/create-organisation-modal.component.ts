import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { NewOrganisation } from "../../../models/organisation.model";
import { Subject } from "rxjs";
import { AuthService } from "../../../auth/auth.service";
import { OrganisationService } from "../../../shared/services/app/organisation.service";
import { InvitationService } from "../../../shared/services/app/invitation.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-organisation-modal',
  templateUrl: './create-organisation-modal.component.html',
  styleUrls: ['./create-organisation-modal.component.scss']
})
export class CreateOrganisationModalComponent extends TranslateComponent{

  @Input() open: boolean;
  @Output() visibleChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  newOrg: NewOrganisation = {
    name: ""
  }
  submitCreate: Subject<any> = new Subject<any>();
  createActive = false;
  createError: string = null;

  constructor(private orgService: OrganisationService,
              private router: Router) {
    super();
  }

  visibleChange($event: boolean) {
    this.visibleChanged.emit($event);
  }

  createOrg() {
    this.submitCreate.next(true);
  }

  async onCreateSubmit($event: NewOrganisation) {
    this.createActive = true;
    try {
      await this.orgService.createOrganisation($event);
      this.createActive = false;
      this.visibleChanged.emit(false);
      await this.router.navigate([""]);
    } catch (e) {
      this.createActive = false;
      this.createError = e.error.message;
    }
  }

}
