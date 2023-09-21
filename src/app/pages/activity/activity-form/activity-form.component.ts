import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { filter, Subject } from "rxjs";
import { NewParticipant, Participant } from "../../../models/participant.model";
import dayjs from "dayjs";
import { NewActivity } from "../../../models/activity.model";
import { Application } from "../../../models/application.model";
import { ParticipantService } from "../../../shared/services/app/participant.service";
import { ApplicationService } from "../../../shared/services/app/application.service";
import { TranslateComponent } from "../../../shared/translate/translate.component";

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent extends TranslateComponent implements OnInit{

  validated = false;
  applications: Application[];
  participants: Participant[];

  file: File;

  @ViewChild('newActivityForm') form: NgForm;
  @Input() submit: Subject<any>;
  @Input() newActivity: NewActivity;
  @Output() onSubmitForm: EventEmitter<NewActivity> = new EventEmitter<NewActivity>();

  constructor(private participantService: ParticipantService,
              private applicationService: ApplicationService) {
    super()
  }

  ngOnInit(): void {
    this.submit?.subscribe(() => {
      this.form.ngSubmit.emit(true);
    })
    this.participantService.$participants.subscribe(p => {
      if (p){
        this.participants = p;
        if (!this.newActivity.participantId){
          this.newActivity.participantId = p[0]?.id;
        }
      }
    })

    this.applicationService.$applications.subscribe(a => {
      if (a){
        this.applications = a;
        if (!this.newActivity.applicationId){
          this.newActivity.applicationId = a[0]?.id
        }
      }
    })
  }

  async onSubmit(form: NgForm) {
    console.log(this.newActivity, this.file);
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

  onFileSelected($event){
    this.file = $event.target.files[0];
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
