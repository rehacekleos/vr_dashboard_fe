import { Component, OnInit } from '@angular/core';
import { Organisation } from "../../models/organisation.model";
import { OrganisationService } from "../../shared/services/app/organisation.service";
import { Clipboard } from "@angular/cdk/clipboard";
import { CustomToastrService } from "../../shared/services/custom-toastr.service";
import { Employee } from "../../models/employee.model";
import { EmployeeService } from "../../shared/services/app/employee.service";
import { Invitation } from "../../models/invitation.model";
import { InvitationService } from "../../shared/services/app/invitation.service";
import dayjs from "dayjs";

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent implements OnInit {

  organisation: Organisation;
  employees: Employee[];
  invitations: Invitation[];

  openInvitationModal = false;
  deleteModalOpen = false;
  invitationToDelete: Invitation;

  constructor(private orgService: OrganisationService,
              private toastr: CustomToastrService,
              private empService: EmployeeService,
              private invitationService: InvitationService,
              private clipboard: Clipboard) {
  }

  ngOnInit(): void {
    this.orgService.$selectedOrganisation.subscribe(org => {
      this.organisation = org;
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
    this.toastr.showToastMessage("Code copied.");
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
      this.toastr.showToastMessage("Invitation refreshed.");
    } catch (e) {
      console.log(e)
    }
  }

  async deleteInvitation() {
    try {
      await this.invitationService.deleteInvitation(this.invitationToDelete.id);
      this.toastr.showToastMessage("Invitation was deleted!");
      this.deleteModalOpen = false;
    } catch (e) {
      console.log(e)
    }
  }

  getDeleteMessage() {
    if (this.invitationToDelete) {
      return `Are you want to delete invitation with emial: ${this.invitationToDelete.email}?`;
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
