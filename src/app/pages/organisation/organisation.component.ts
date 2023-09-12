import { Component, OnInit } from '@angular/core';
import { Organisation } from "../../models/organisation.model";
import { OrganisationService } from "../../shared/services/app/organisation.service";
import { Clipboard } from "@angular/cdk/clipboard";
import { CustomToastrService } from "../../shared/services/custom-toastr.service";
import { Employee } from "../../models/employee.model";

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss']
})
export class OrganisationComponent implements OnInit{

  organisation: Organisation;
  employees: Employee[];

  constructor(private orgService: OrganisationService,
              private toastr: CustomToastrService,
              private clipboard: Clipboard) {
  }

  ngOnInit(): void {
    this.orgService.$selectedOrganisation.subscribe(org => {
      this.organisation = org;
    })
  }

  copyCode() {
    this.clipboard.copy(this.organisation.code);
    this.toastr.showToastMessage("Code copied.");

  }
}
