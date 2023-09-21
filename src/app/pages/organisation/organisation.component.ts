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
import { Application } from "../../models/application.model";
import { ApplicationService } from "../../shared/services/app/application.service";
import { TranslateComponent } from "../../shared/translate/translate.component";

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent extends TranslateComponent implements OnInit {

  organisations: Organisation[]
  openModal = false;

  constructor(private organisationService: OrganisationService) {
    super();
  }

  ngOnInit(): void {
    this.organisationService.$organisations.subscribe(o => {
      this.organisations = o;
    })
  }


  invisibleChanged($event: boolean) {
    this.openModal = $event;
  }

  onOpenModal() {
    this.openModal = true;
  }
}
