import { Component } from '@angular/core';
import { Application } from "../../models/application.model";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {

  openModal = false;


  modalVisibleChange($event: boolean) {
    this.openModal = $event;
  }

}
