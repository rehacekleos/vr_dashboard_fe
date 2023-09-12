import { Component, OnInit } from '@angular/core';
import { Participant } from "../../models/participant.model";
import { ParticipantService } from "../../shared/services/app/participant.service";
import { Router } from "@angular/router";
import dayjs from "dayjs";

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit{

  participants: Participant[];
  openModal = false;

  constructor(private participantService: ParticipantService,
              private router: Router) {
  }

  ngOnInit(): void {
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
