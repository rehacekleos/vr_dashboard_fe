import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateComponent } from "../../../shared/translate/translate.component";

@Component({
  selector: 'app-create-or-join-organisation-modal',
  templateUrl: './create-or-join-organisation-modal.component.html',
  styleUrls: ['./create-or-join-organisation-modal.component.scss']
})
export class CreateOrJoinOrganisationModalComponent extends TranslateComponent{

  @Input() open: boolean;
  @Output() visibleChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  visibleChange($event: boolean) {
    this.visibleChanged.emit($event);
  }

}
