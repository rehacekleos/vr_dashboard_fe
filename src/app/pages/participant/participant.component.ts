import { Component, OnInit } from '@angular/core';
import { Participant } from "../../models/participant.model";
import { ParticipantService } from "../../shared/services/app/participant.service";
import { Router } from "@angular/router";
import dayjs from "dayjs";
import { TranslateComponent } from "../../shared/translate/translate.component";

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent extends TranslateComponent implements OnInit{

  participants: Participant[];
  openModal = false;

  constructor(private participantService: ParticipantService,
              private router: Router) {
    super()
  }

  async ngOnInit(): Promise<void> {
    await this.participantService.getParticipants();
    this.participantService.$participants.subscribe(p => {
      this.participants = p;
    })
  }

  modalVisibleChange($event: boolean) {
    this.openModal = $event;
  }

  async goToDetail(id: string) {
    await this.router.navigate(['participant', id]);
  }

  getAge(birthday: string) {
    if (birthday === ""){
      return ""
    }
    const date = dayjs(birthday);
    return dayjs().diff(date, 'year')
  }
}
