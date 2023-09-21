import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from "@angular/forms";
import { RegisterUser } from "../../../models/auth.model";
import { NewParticipant } from "../../../models/participant.model";
import dayjs from "dayjs";
import { Subject } from "rxjs";
import { ParticipantService } from "../../../shared/services/app/participant.service";
import { Router } from "@angular/router";
import { TranslateComponent } from "../../../shared/translate/translate.component";

@Component({
  selector: 'app-new-participant-modal',
  templateUrl: './new-participant-modal.component.html',
  styleUrls: ['./new-participant-modal.component.scss']
})
export class NewParticipantModalComponent extends TranslateComponent{

  submitForm: Subject<any> = new Subject<any>()
  error: string;

  newParticipant: NewParticipant = {
    nickname: "",
    name: "",
    surname: "",
    birthday: "",
    description: "",
    sex: ""
  }

  @Input() open: boolean;
  @Output() visibleChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private participantService: ParticipantService,
              private router: Router) {
    super()
  }


  visibleChange($event: boolean) {
    this.visibleChanged.emit($event);
  }

  onSubmit() {
    this.submitForm.next(true);
  }


  async onSubmitForm($event: NewParticipant) {
    try {
      const participant = await this.participantService.createParticipant($event);
      this.visibleChanged.emit(false);
      await this.router.navigate(['/participant', participant.id]);
    } catch (e){
      this.error = e.error.message;
    }
  }
}
