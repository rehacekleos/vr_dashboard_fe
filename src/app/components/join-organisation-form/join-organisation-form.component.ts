import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AcceptInvitation } from "../../models/invitation.model";
import { Subject } from "rxjs";
import { NewActivity } from "../../models/activity.model";
import { TranslateComponent } from "../../shared/translate/translate.component";

@Component({
  selector: 'app-join-organisation-form',
  templateUrl: './join-organisation-form.component.html',
  styleUrls: ['./join-organisation-form.component.scss']
})
export class JoinOrganisationFormComponent extends TranslateComponent{

  @Input() submit: Subject<any>;
  @Input() acceptInvitation: AcceptInvitation;
  @Output() onSubmitForm: EventEmitter<AcceptInvitation> = new EventEmitter<AcceptInvitation>();
  @ViewChild('joinForm') form: NgForm;

  joinValidated = false;

  ngOnInit(): void {
    this.submit?.subscribe(() => {
      this.form.ngSubmit.emit(true);
    })
  }

  async onSubmit(form: NgForm) {
    this.joinValidated = true;
    if (form.valid) {
      try {
        this.onSubmitForm.emit(this.acceptInvitation);
      } catch (e: any) {
        this.joinValidated = false;
      }
    }
  }

}
