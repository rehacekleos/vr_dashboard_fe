import { Component, Input, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Application } from "../../models/application.model";
import { DomSanitizer } from "@angular/platform-browser";
import { Organisation } from "../../models/organisation.model";
import { OrganisationService } from "../../shared/services/app/organisation.service";

@Component({
  selector: 'app-application-module',
  templateUrl: './application-module.component.html',
  styleUrls: ['./application-module.component.scss']
})
export class ApplicationModuleComponent implements OnInit{

  @Input({required: true}) application: Application;
  @Input({required: true}) moduleVersion: string;
  @Input({required: true}) activityId: string;
  @Input({required: true}) environmentId: string;
  organisation: Organisation;

  constructor(private sanitizer: DomSanitizer,
              private organisationService: OrganisationService) {

  }

  ngOnInit(): void {
    this.organisationService.$selectedOrganisation.subscribe(o => {
      this.organisation = o;
    })
  }

  getApplicationModule() {
    const params = `?application_identifier=${this.application.identifier}&&organisation_code=${this.organisation.code}&&activity_id=${this.activityId}&&environment_id=${this.environmentId}`
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.apiUrl}/public/modules/${this.application.id}/${this.moduleVersion}/${params}`);
  }


}
