import { Component } from '@angular/core';
import { Participant } from "../../../models/participant.model";
import { DomSanitizer } from "@angular/platform-browser";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Router } from "@angular/router";

dayjs.extend(duration)

@Component({
  selector: 'app-participant-detail',
  templateUrl: './participant-detail.component.html',
  styleUrls: ['./participant-detail.component.scss']
})
export class ParticipantDetailComponent {

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

  getAge(birthday: string) {
    const date = dayjs(birthday);
    return dayjs().diff(date, 'year')
  }

  async goToEdit() {
    await this.router.navigate(['participant', this.participant.id, 'edit'])
  }
}
