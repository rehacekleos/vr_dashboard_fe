import { Component, OnInit } from '@angular/core';
import { Participant } from "../../../models/participant.model";
import { DomSanitizer } from "@angular/platform-browser";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { ActivatedRoute, Router } from "@angular/router";
import { ParticipantService } from "../../../shared/services/app/participant.service";

dayjs.extend(duration)

@Component({
  selector: 'app-participant-detail',
  templateUrl: './participant-detail.component.html',
  styleUrls: ['./participant-detail.component.scss']
})
export class ParticipantDetailComponent implements OnInit{

  participant: Participant

  constructor(private _sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private participantService: ParticipantService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(async p => {
      this.participant = await this.participantService.getParticipant(p.id)
    })
  }


  getProfileImage() {
    if (this.participant?.img){
      return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.participant?.img)
    }
    return './assets/img/undraw_pic_profile_re_7g2h.svg'
  }

  getAge(birthday: string) {
    if (birthday === ""){
      return ""
    }
    const date = dayjs(birthday);
    return dayjs().diff(date, 'year')
  }

  async goToEdit() {
    await this.router.navigate(['participant', this.participant.id, 'edit'])
  }

}
