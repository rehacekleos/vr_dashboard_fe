import { Component, OnInit } from '@angular/core';
import { Participant } from "../../models/participant.model";

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit{

  participants: Participant[];
  openModal = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  modalVisibleChange($event: boolean) {
    this.openModal = $event;
  }
}
