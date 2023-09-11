import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { User } from "../../../models/user.model";
import { AuthService } from "../../../auth/auth.service";
import { Organisation } from "../../../models/organisation.model";
import { OrganisationService } from "../../../shared/services/organisation.service";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit{

  @Input() sidebarId: string = "sidebar";

  user: User = null;
  organisation: Organisation = null;

  constructor(private authService: AuthService,
              private orgService: OrganisationService) {
    super();
  }

  ngOnInit(): void {
    this.authService.$user.subscribe(user => {
      this.user = user;
    })

    this.orgService.$selectedOrganisation.subscribe(org => {
      this.organisation = org;
    })
  }

  getName(){
    return `${this.user.name} ${this.user.surname}`
  }

  async logout() {
    await this.authService.logout();
  }
}
