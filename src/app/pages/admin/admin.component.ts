import { Component } from '@angular/core';
import { TranslateComponent } from "../../shared/translate/translate.component";
import { Application } from "../../models/application.model";
import { ApplicationService } from "../../shared/services/app/application.service";
import { AdminService } from "../../shared/services/app/admin.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends TranslateComponent{

  applications: Application[]
  openApplicationModal = false;

  constructor(private adminService: AdminService) {
    super()
  }

  async ngOnInit(): Promise<void> {
    this.applications = await this.adminService.getAllApplications();
  }


  invisibleApplicationChanged($event: boolean) {
    this.openApplicationModal = $event;
  }

  onOpenApplicationModal() {
    this.openApplicationModal = true;
  }

}
