import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NewParticipant } from "../../../models/participant.model";
import { NgForm } from "@angular/forms";
import dayjs from "dayjs";
import { Subject } from "rxjs";

@Component({
  selector: 'app-participant-form',
  templateUrl: './participant-form.component.html',
  styleUrls: ['./participant-form.component.scss']
})
export class ParticipantFormComponent implements OnInit{

  validated = false;

  @ViewChild('newParticipantForm') form: NgForm;
  @Input() submit: Subject<any>;
  @Input() newParticipant: NewParticipant;
  @Output() onSubmitForm: EventEmitter<NewParticipant> = new EventEmitter<NewParticipant>();

  ngOnInit(): void {
    this.submit?.subscribe(() => {
      this.form.ngSubmit.emit(true);
    })
  }

  async onSubmit(form: NgForm) {
    this.validated = true;
    if (form.valid) {
      try {
        const newParticipant: NewParticipant = {
          nickname: form.form.controls['nickname'].value,
          name: form.form.controls['name'].value,
          surname: form.form.controls['surname'].value,
          birthday: form.form.controls['birthday'].value,
          description: form.form.controls['description'].value,
          sex: form.form.controls['sex'].value
        }

        this.onSubmitForm.emit(newParticipant);
      } catch (e) {
        this.validated = false;
      }
    }
  }

  getBirthdayMax() {
    return dayjs().format("YYYY-MM-DD");
  }



}
