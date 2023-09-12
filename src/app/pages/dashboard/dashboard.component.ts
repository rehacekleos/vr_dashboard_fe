import { Component, OnInit } from '@angular/core';
import { Organisation } from "../../models/organisation.model";
import { OrganisationService } from "../../shared/services/app/organisation.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  organisation: Organisation;

  constructor(private orgService: OrganisationService) {
  }

  ngOnInit(): void {
    this.orgService.$selectedOrganisation.subscribe(org => {
      this.organisation = org;
    })
  }

}
