import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Subject } from "rxjs";
import { NewParticipant } from "../../../models/participant.model";
import dayjs from "dayjs";
import { NewApplication } from "../../../models/application.model";
import { TranslateComponent } from "../../../shared/translate/translate.component";

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss']
})
export class ApplicationFormComponent extends TranslateComponent{
  validated = false;

  @ViewChild('applicationForm') form: NgForm;
  @Input() submit: Subject<any>;
  @Input() newApplication: NewApplication;
  @Output() onSubmitForm: EventEmitter<NewApplication> = new EventEmitter<NewApplication>();


  ngOnInit(): void {
    this.submit?.subscribe(() => {
      this.form.ngSubmit.emit(true);
    })
  }

  async onSubmit(form: NgForm) {
    this.validated = true;
    if (form.valid) {
      try {
        this.onSubmitForm.emit(this.newApplication);
      } catch (e) {
        this.validated = false;
      }
    }
  }
}
