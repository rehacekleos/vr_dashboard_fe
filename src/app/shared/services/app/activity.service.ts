import { Injectable } from '@angular/core';
import { HttpService } from "../http.service";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { Activity } from "../../../models/activity.model";
import { OrganisationService } from "./organisation.service";

@Injectable({
  providedIn: 'root'
})
export class ActivityService extends HttpService{

  $activities: BehaviorSubject<Activity[]> = new BehaviorSubject<Activity[]>(undefined);

  constructor(private http: HttpClient,
              private orgService: OrganisationService) {
    super('/activity');

    this.orgService.$selectedOrganisation.subscribe(async o => {
      if (o) {
        await this.getActivities();
      }
    })
  }

  async getActivities(){
    const res = await firstValueFrom(this.http.get<Activity[]>(this.createUrl('')));
    this.$activities.next(res);
  }
}
