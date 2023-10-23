import { Component, Input } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Application } from "../../models/application.model";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-application-module',
  templateUrl: './application-module.component.html',
  styleUrls: ['./application-module.component.scss']
})
export class ApplicationModuleComponent {

  constructor(private sanitizer: DomSanitizer) {
  }

  @Input({required: true}) application: Application;

  getApplicationModule() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${environment.apiUrl}/public/modules/${this.application.id}/`);
  }
}
