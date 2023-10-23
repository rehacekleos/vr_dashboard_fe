import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { Activity, ActivityTable } from "../../../models/activity.model";
import dayjs from "dayjs";
import { ApplicationService } from "../../../shared/services/app/application.service";
import { ParticipantService } from "../../../shared/services/app/participant.service";
import { Application } from "../../../models/application.model";
import { Participant } from "../../../models/participant.model";
import { Router } from "@angular/router";
import { cibFSecure } from "@coreui/icons";

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.scss']
})
export class ActivityTableComponent extends TranslateComponent implements OnInit, OnChanges {

  @Input({required: true}) activities: Activity[];
  @Input() showParticipant: boolean = true;
  @Input() pagination: boolean = false;
  @Input() searchValue: string = ""
  applications: Application[];
  participants: Participant[];

  filteredActivities: ActivityTable[];

  itemsPerPage = 10
  pages = 0;
  currentPage = 0;

  constructor(private applicationService: ApplicationService,
              private participantService: ParticipantService,
              private router: Router) {
    super();
  }

  ngOnInit(): void {

    this.applicationService.$applications.subscribe(a => {
      this.applications = a;
    })

    this.participantService.$participants.subscribe(p => {
      this.participants = p;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activities){
      if (this.activities && this.pagination) {
        if (this.itemsPerPage < this.activities.length) {
          this.pages = Math.ceil(this.activities.length / this.itemsPerPage);
        }
      }
      this.filterActivities();
    }

    if (changes.searchValue){
      this.filterActivities();
    }
  }

  filterActivities(){
    if (this.activities) {
      let converted = this.convertToActivityTable(this.activities);
      console.log(this.searchValue)
      if (this.searchValue !== "") {
        converted = converted.filter(c => c.search.includes(this.searchValue))
      }
      if (this.pages > 0) {
        this.filteredActivities = converted.slice(this.currentPage * this.itemsPerPage, this.currentPage * this.itemsPerPage + this.itemsPerPage);
      } else {
        console.log()
        this.filteredActivities = converted;
      }
    }
  }

  convertToActivityTable(activities: Activity[]): ActivityTable[]{
    return activities.map(a => {
      const activity: ActivityTable = {
        id: a.id,
        createdIn: this.getTime(a),
        start: this.getStart(a),
        participant: this.getParticipant(a),
        application: this.getApplication(a)
      }

      activity.search = `${activity.createdIn.toLowerCase()} ${activity.start.toLowerCase()} ${activity.participant.toLowerCase()} ${activity.application.toLowerCase()}`

      return activity;
    })
  }

  async goToDetail(id: string) {
    await this.router.navigate(['activity', id])
  }

  getParticipant(activity: Activity) {
    if (activity.participantId) {
      const participant = this.participants?.find(p => p.id === activity.participantId);
      if (participant) {
        return participant.nickname;
      }
    }
    return "";
  }

  getApplication(activity: Activity) {
    if (activity.applicationId) {
      const application = this.applications?.find(a => a.id === activity.applicationId);
      if (application) {
        return application.name;
      }
    }
    return "";
  }

  getTime(activity: Activity) {
    return dayjs(activity.time).format("DD.MM.YYYY HH:mm:ss")
  }

  getStart(activity: Activity){
    return dayjs(activity.data.start).format("DD.MM.YYYY HH:mm:ss")
  }

  previousPage() {
    this.currentPage--;
    this.filterActivities();
  }

  nextPage() {
    this.currentPage++;
    this.filterActivities();
  }


  protected readonly cibFSecure = cibFSecure;
}
