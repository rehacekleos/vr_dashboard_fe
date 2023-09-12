import { Component, OnInit } from '@angular/core';
import { NewParticipant, Participant } from "../../../models/participant.model";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ParticipantService } from "../../../shared/services/app/participant.service";
import { Subject } from "rxjs";
import { CustomToastrService } from "../../../shared/services/custom-toastr.service";

@Component({
  selector: 'app-participant-edit',
  templateUrl: './participant-edit.component.html',
  styleUrls: ['./participant-edit.component.scss']
})
export class ParticipantEditComponent implements OnInit{

  participant: Participant
  submitForm: Subject<any> = new Subject<any>()

  deleteModalOpen = false;

  constructor(private _sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private participantService: ParticipantService,
              private toaster: CustomToastrService,
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

  async cancel() {
    await this.router.navigate(['participant', this.participant.id])
  }

  async onSubmitForm($event: NewParticipant) {
    const participant: Participant = {
      id: this.participant.id,
      organisationId: this.participant.organisationId,
      ...$event
    }
    try {
      await this.participantService.updateParticipant(participant);
      this.toaster.showToastMessage("Participant was updated.");
      await this.router.navigate(['participant', this.participant.id])
    } catch (e) {
      console.log(e);
    }
  }

  onSaveButtonClick() {
    this.submitForm.next(true)
  }

  async deleteParticipant() {
    await this.participantService.deleteParticipant(this.participant.id);
    this.toaster.showToastMessage("Participant was deleted!");
    this.deleteModalOpen = false;
    await this.router.navigate(['participant']);
  }

  getDeleteMessage() {
    return `Are you want to delete participant with nickname: ${this.participant.nickname}?`;
  }

  openConfirmModal() {
    this.deleteModalOpen = true;
  }

  closeConfirmModal() {
    this.deleteModalOpen = false;
  }
}
