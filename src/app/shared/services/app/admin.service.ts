import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { OrganisationService } from "./organisation.service";
import { HttpService } from "../http.service";
import { BehaviorSubject, firstValueFrom, ReplaySubject } from "rxjs";
import { Application } from "../../../models/application.model";
import { Organisation } from "../../../models/organisation.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService extends HttpService{

  $applications: BehaviorSubject<Application[]> = new BehaviorSubject<Application[]>(undefined);
  $organisations: BehaviorSubject<Organisation[]> = new BehaviorSubject<Organisation[]>(undefined);

  constructor(private http: HttpClient) {
    super('/admin');
  }

  async getAllApplications(){
    const res = await firstValueFrom(this.http.get<Application[]>(this.createUrl('/applications')));
    this.$applications.next(res);
  }

  async getAllOrganisations() {
    const res =  await firstValueFrom(this.http.get<Organisation[]>(this.createUrl('/organisations')));
    this.$organisations.next(res);
  }
}
