import { Component, OnInit } from '@angular/core';
import { NewParticipant, Participant } from "../../../models/participant.model";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { ParticipantService } from "../../../shared/services/app/participant.service";
import { Subject } from "rxjs";
import { CustomToastrService } from "../../../shared/services/custom-toastr.service";
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { CustomTranslateService } from "../../../shared/translate/services/custom-translate.service";
import { Translations } from "../../../shared/translate/translate.model";

@Component({
  selector: 'app-participant-edit',
  templateUrl: './participant-edit.component.html',
  styleUrls: ['./participant-edit.component.scss']
})
export class ParticipantEditComponent extends TranslateComponent implements OnInit{

  participant: Participant
  submitForm: Subject<any> = new Subject<any>()

  deleteModalOpen = false;

  constructor(private _sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private translationService: CustomTranslateService,
              private participantService: ParticipantService,
              private toaster: CustomToastrService,
              private router: Router) {
    super();
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
      this.toaster.showToastMessage(this.translationService.instantTranslation(Translations.messages.update.participant));
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
    this.toaster.showToastMessage(this.translationService.instantTranslation(Translations.messages.delete.participant));
    this.deleteModalOpen = false;
    await this.router.navigate(['participant']);
  }

  getDeleteMessage() {
    return this.translationService.instantTranslation(Translations.confirm.delete.participant_$, {param: this.participant.nickname});
  }

  openConfirmModal() {
    this.deleteModalOpen = true;
  }

  closeConfirmModal() {
    this.deleteModalOpen = false;
  }
}