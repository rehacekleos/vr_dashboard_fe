import { Component, OnInit } from '@angular/core';
import { Organisation } from "../../../models/organisation.model";
import { Employee } from "../../../models/employee.model";
import { Invitation } from "../../../models/invitation.model";
import { OrganisationService } from "../../../shared/services/app/organisation.service";
import { CustomToastrService } from "../../../shared/services/custom-toastr.service";
import { EmployeeService } from "../../../shared/services/app/employee.service";
import { InvitationService } from "../../../shared/services/app/invitation.service";
import { Clipboard } from "@angular/cdk/clipboard";
import dayjs from "dayjs";
import { ActivatedRoute } from "@angular/router";
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { CustomTranslateService } from "../../../shared/translate/services/custom-translate.service";
import { Translations } from "../../../shared/translate/translate.model";

@Component({
  selector: 'app-organisation-detail',
  templateUrl: './organisation-detail.component.html',
  styleUrls: ['./organisation-detail.component.scss']
})
export class OrganisationDetailComponent extends TranslateComponent implements OnInit{

  organisation: Organisation;
  employees: Employee[];
  invitations: Invitation[];

  openInvitationModal = false;
  deleteModalOpen = false;
  invitationToDelete: Invitation;

  constructor(private orgService: OrganisationService,
              private toastr: CustomToastrService,
              private empService: EmployeeService,
              private route: ActivatedRoute,
              private translationService: CustomTranslateService,
              private invitationService: InvitationService,
              private clipboard: Clipboard) {
    super()
  }

  ngOnInit(): void {
    this.route.params.subscribe(async p => {
      this.organisation = await this.orgService.getOrganisation(p.id)
    })

    this.empService.$employees.subscribe(e => {
      this.employees = e;
    })

    this.invitationService.$invitations.subscribe(i => {
      this.invitations = i;
    })
  }

  copyCode(code: string) {
    this.clipboard.copy(code);
    this.toastr.showToastMessage(this.translationService.instantTranslation(Translations.messages.copy.code));
  }

  invitationModalVisibleChange($event: any) {
    this.openInvitationModal = $event;
  }

  toLocaleTime(time: string) {
    return dayjs(time).format("hh:mm DD.MM.YYYY")
  }

  isExpired(time: string) {
    const now = dayjs();
    const created = dayjs(time);

    return now.diff(created, 'minute', true) > 30
  }

  async refreshInvitation(id: string) {
    try {
      await this.invitationService.refreshInvitation(id);
      this.toastr.showToastMessage(this.translationService.instantTranslation(Translations.messages.update.invitation));
    } catch (e) {
      console.log(e)
    }
  }

  async deleteInvitation() {
    try {
      await this.invitationService.deleteInvitation(this.invitationToDelete.id);
      this.toastr.showToastMessage(this.translationService.instantTranslation(Translations.messages.delete.invitation));
      this.deleteModalOpen = false;
    } catch (e) {
      console.log(e)
    }
  }

  getDeleteMessage() {
    if (this.invitationToDelete) {
      return this.translationService.instantTranslation(Translations.confirm.delete.invitation_$, {param: this.invitationToDelete.email})
    }
  }

  openDeleteModal(invitation: Invitation) {
    this.deleteModalOpen = true;
    this.invitationToDelete = invitation;
  }

  closeDeleteModal() {
    this.deleteModalOpen = false;
  }

}
