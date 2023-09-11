import { Component } from '@angular/core';
import { Participant } from "../../../models/participant.model";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

@Component({
  selector: 'app-participant-edit',
  templateUrl: './participant-edit.component.html',
  styleUrls: ['./participant-edit.component.scss']
})
export class ParticipantEditComponent {

  participant: Participant = {
    nickname: "rehacleo",
    id: "1",
    organisationId: "",
    birthday: "1996-09-16",
    name: "Leoš",
    surname: "Řeháček",
    sex: "men",
    description: `adasdasdaad \n adasdasdaad \n adasdasdaad \n adasdasdaad \n adasdasdaad \n adasdasdaad \n asdasdasd \n asdadasd asddsadasd dsa das d sa dsa d sa d as das dsa d asd a asdasd sad as  sad das d ads sa dd asd asad `
  }

  constructor(private _sanitizer: DomSanitizer,
              private router: Router) {
  }

  getProfileImage() {
    if (this.participant?.img){
      return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.participant?.img)
    }
    return './assets/img/undraw_pic_profile_re_7g2h.svg'
  }

  async cancel() {
    await this.router.navigate(['participant', this.participant.id])
  }
}
