import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from "rxjs";
import { NewActivity } from "../../models/activity.model";
import dayjs from "dayjs";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {

  @Input() open: boolean;
  @Input() color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string;
  @Input() title: string;
  @Input() message: string;
  @Input() confirmButtonText: string;
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() confirm: EventEmitter<boolean> = new EventEmitter<boolean>();



  visibleChange($event: boolean) {
    if ($event === false){
      this.cancel.emit($event);
    }
  }

  onSubmit() {
    this.confirm.next(true);
  }

}
