import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Subject } from "rxjs";
import { NewParticipant } from "../../../models/participant.model";
import dayjs from "dayjs";
import { NewActivity } from "../../../models/activity.model";
import { Application } from "../../../models/application.model";

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit{

  validated = false;
  applications: Application[];

  @ViewChild('newActivityForm') form: NgForm;
  @Input() submit: Subject<any>;
  @Input() newActivity: NewActivity;
  @Output() onSubmitForm: EventEmitter<NewActivity> = new EventEmitter<NewActivity>();

  ngOnInit(): void {
    this.submit?.subscribe(() => {
      this.form.ngSubmit.emit(true);
    })
  }

  async onSubmit(form: NgForm) {
    this.validated = true;
    if (form.valid) {
      try {
        const newActivity: NewActivity = {
          time: form.form.controls['time'].value,
          data: "",
          anonymous: Boolean(form.form.controls['anonymous'].value),
          notes: form.form.controls['notes'].value,
          applicationId: form.form.controls['application'].value
        }

        this.onSubmitForm.emit(newActivity);
      } catch (e) {
        this.validated = false;
      }
    }
  }

  getTimeMax() {
    return dayjs().format('YYYY-MM-DDTHH:mm')
  }

  isAnonymous() {
    if (this.newActivity.anonymous == null){
      return false
    } else {
      return this.newActivity.anonymous
    }
  }
}
