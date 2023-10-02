import { Component, OnInit } from '@angular/core';
import { Participant } from "../../../models/participant.model";
import { DomSanitizer } from "@angular/platform-browser";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { ActivatedRoute, Router } from "@angular/router";
import { ParticipantService } from "../../../shared/services/app/participant.service";
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { ApplicationService } from "../../../shared/services/app/application.service";
import { Activity } from "../../../models/activity.model";
import { ActivityService } from "../../../shared/services/app/activity.service";
import { CustomToastrService } from "../../../shared/services/custom-toastr.service";

dayjs.extend(duration)

@Component({
  selector: 'app-participant-detail',
  templateUrl: './participant-detail.component.html',
  styleUrls: ['./participant-detail.component.scss']
})
export class ParticipantDetailComponent extends TranslateComponent implements OnInit{

  participant: Participant
  activities: Activity[];

  constructor(private _sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private participantService: ParticipantService,
              private activityService: ActivityService,
              private toastr: CustomToastrService,
              private router: Router) {
    super()
  }

  ngOnInit(): void {
    this.route.params.subscribe(async p => {
      this.participant = await this.participantService.getParticipant(p.participantId);
      if (this.participant === null){
        this.toastr.showToastMessage("Participant not found.", 3000, "danger")
        await this.router.navigate(["participant"]);
      }
      await this.activityService.getActivitiesForParticipant(this.participant.id);
    })

    this.activityService.$activitiesForParticipant.subscribe(a => {
      this.activities = a;
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
