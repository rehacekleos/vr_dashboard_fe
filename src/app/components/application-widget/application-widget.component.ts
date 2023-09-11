import { Component, Input } from '@angular/core';
import { Application } from "../../models/application.model";

@Component({
  selector: 'app-application-widget',
  templateUrl: './application-widget.component.html',
  styleUrls: ['./application-widget.component.scss']
})
export class ApplicationWidgetComponent {
  @Input() application: Application

}
