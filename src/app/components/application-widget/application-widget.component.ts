import { Component, Input } from '@angular/core';
import { Application } from "../../models/application.model";
import { Translations } from "../../shared/translate/translate.model";
import { TranslateComponent } from "../../shared/translate/translate.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-application-widget',
  templateUrl: './application-widget.component.html',
  styleUrls: ['./application-widget.component.scss']
})
export class ApplicationWidgetComponent extends TranslateComponent{
  @Input() application: Application

  constructor(private router: Router) {
    super();
  }

  async gotoDetail() {
    await this.router.navigate(["application", this.application.id]);
  }
}
