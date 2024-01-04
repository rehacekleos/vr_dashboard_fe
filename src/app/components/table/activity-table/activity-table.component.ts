import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { Activity, ActivityTable } from "../../../models/activity.model";
import dayjs from "dayjs";
import { ApplicationService } from "../../../shared/services/app/application.service";
import { ParticipantService } from "../../../shared/services/app/participant.service";
import { Application } from "../../../models/application.model";
import { Participant } from "../../../models/participant.model";
import { Router } from "@angular/router";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { combineLatest, forkJoin } from "rxjs";
import { CustomTranslateService } from "../../../shared/translate/services/custom-translate.service";
import { TitleCasePipe } from "@angular/common";
import { Translations } from "../../../shared/translate/translate.model";

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.scss']
})
export class ActivityTableComponent extends TranslateComponent implements OnInit, OnChanges {

  @Input({required: true}) activities: Activity[];
  @Input() showParticipant: boolean = true;
  @Input() pagination: boolean = false;
  applications: Application[];
  participants: Participant[];

  comparing = false;
  compareMap: Map<string, ActivityTable> = new Map();

  application = "";
  participant = "";
  toDate = "";
  fromDate = "";

  filteredActivities: ActivityTable[];

  itemsPerPage = 20
  pages = 0;
  currentPage = 0;

  constructor(private applicationService: ApplicationService,
              private participantService: ParticipantService,
              private translateService: CustomTranslateService,
              private titleCasePipe: TitleCasePipe,
              private router: Router) {
    super();
  }

  ngOnInit(): void {

    this.compareMap = new Map();

    combineLatest([this.applicationService.$applications, this.participantService.$participants]).subscribe(([a, p]) => {
      this.applications = a;
      this.participants = p;
      this.filterActivities()
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activities){
      this.activities = changes.activities.currentValue;
      if (this.activities && this.pagination) {
        if (this.itemsPerPage < this.activities.length) {
          this.pages = Math.ceil(this.activities.length / this.itemsPerPage);
        }
      }
      this.filterActivities();
    }
  }

  filterActivities(){
    if (this.activities && this.applications && this.participants) {
      let converted = this.filteringFunctions(this.convertToActivityTable(this.activities));
      if (this.pages > 0) {
        this.filteredActivities = converted.slice(this.currentPage * this.itemsPerPage, this.currentPage * this.itemsPerPage + this.itemsPerPage);
      } else {
        this.filteredActivities = converted;
      }
    }
  }

  private filteringFunctions(activities: ActivityTable[]): ActivityTable[]{

    return activities.filter(a => {
      return (this.participant !== "" ? a.participantId === this.participant : true) &&
        (this.application !== "" ? a.applicationId === this.application : true) &&
        (dayjs(this.fromDate).isValid() ? dayjs(this.fromDate).isSameOrBefore(a.start, "day") : true) &&
        (dayjs(this.toDate).isValid() ? dayjs(this.toDate).isSameOrAfter(a.start, "day") : true)
    })
  }

  convertToActivityTable(activities: Activity[]): ActivityTable[]{
    return activities.map(a => {
      const application = this.getApplication(a);
      const participant = this.getParticipant(a);


      let participantName: string;
      if (a.anonymous){
        participantName = this.titleCasePipe.transform(this.translateService.instantTranslation(Translations.anonymous));
      } else if (!participant){
        participantName = this.titleCasePipe.transform(this.translateService.instantTranslation(Translations.deleted));
      } else {
        participantName = participant?.nickname;
      }

      const activity: ActivityTable = {
        id: a.id,
        start: this.getStart(a),
        participant: participantName,
        application: application?.name || this.titleCasePipe.transform(this.translateService.instantTranslation(Translations.deleted)),
        applicationId: application?.id,
        participantId: participant?.id
      }

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
        return participant;
      }
    }
    return null;
  }

  getApplication(activity: Activity) {
    if (activity.applicationId) {
      const application = this.applications?.find(a => a.id === activity.applicationId);
      if (application) {
        return application;
      }
    }
    return null;
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


  isComparing(id: string) {
    return this.compareMap.has(id);
  }

  canCompare(activity: ActivityTable){
    if (this.compareMap.size > 0){
      const [act] = this.compareMap.values()
      return activity.applicationId !== act.applicationId || this.compareMap.size >= 4;
    }
    return false;
  }

  setCompare(activity: ActivityTable) {
    if (this.compareMap.has(activity.id)){
      this.compareMap.delete(activity.id);
    } else {
      this.compareMap.set(activity.id, activity);
    }
  }

  setComparing(){
    if (this.comparing){
      this.comparing = false;
      this.compareMap = new Map();
    } else {
      this.comparing = true;
      this.compareMap = new Map();
    }
  }

  async compare() {
    const ids = Array.from(this.compareMap.keys());
    if (ids.length > 0) {
      await this.router.navigate(['activity', 'compare'], {queryParams: {ids: JSON.stringify(ids)}});
    }
  }
}
