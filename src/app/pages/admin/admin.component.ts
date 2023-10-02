import { Component } from '@angular/core';
import { TranslateComponent } from "../../shared/translate/translate.component";
import { Application } from "../../models/application.model";
import { ApplicationService } from "../../shared/services/app/application.service";
import { AdminService } from "../../shared/services/app/admin.service";
import { Organisation } from "../../models/organisation.model";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends TranslateComponent{

  applications: Application[]
  openApplicationModal = false;

  organisations: Organisation[]
  openOrganisationModal = false;

  constructor(private adminService: AdminService) {
    super()
  }

  async ngOnInit(): Promise<void> {
    await this.adminService.getAllApplications();
    await this.adminService.getAllOrganisations();

    this.adminService.$applications.subscribe(a => {
      this.applications = a;
    })

    this.adminService.$organisations.subscribe(o => {
      this.organisations = o;
    })

  }


  invisibleApplicationChanged($event: boolean) {
    this.openApplicationModal = $event;
  }

  onOpenApplicationModal() {
    this.openApplicationModal = true;
  }

  invisibleOrganisationChanged($event: boolean) {
    this.openOrganisationModal = $event;
  }

  onOpenOrganisationModal() {
    this.openOrganisationModal = true;
  }

}
