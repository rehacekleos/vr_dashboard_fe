import { Component } from '@angular/core';
import { TranslateComponent } from "../../shared/translate/translate.component";
import { Application } from "../../models/application.model";
import { ApplicationService } from "../../shared/services/app/application.service";
import { AdminService } from "../../shared/services/app/admin.service";
import { Organisation } from "../../models/organisation.model";
import { AuthService } from "../../auth/auth.service";
import { User } from "../../models/user.model";

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

  user: User;

  constructor(private adminService: AdminService,
              private authService: AuthService) {
    super()
  }

  async ngOnInit(): Promise<void>{
    this.user = this.authService.getCurrentUser();
    await this.adminService.getAllApplications(this.user);
    await this.adminService.getAllOrganisations(this.user);


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
