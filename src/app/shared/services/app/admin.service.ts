import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { OrganisationService } from "./organisation.service";
import { HttpService } from "../http.service";
import { BehaviorSubject, firstValueFrom, ReplaySubject } from "rxjs";
import { Application } from "../../../models/application.model";
import { Organisation } from "../../../models/organisation.model";
import { AuthService } from "../../../auth/auth.service";
import { User } from "../../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService extends HttpService{

  $applications: BehaviorSubject<Application[]> = new BehaviorSubject<Application[]>(undefined);
  $organisations: BehaviorSubject<Organisation[]> = new BehaviorSubject<Organisation[]>(undefined);

  constructor(private http: HttpClient) {
    super('/admin');
  }

  async getAllApplications(user: User){
    if (user.superAdmin || user.developer) {
      const res = await firstValueFrom(this.http.get<Application[]>(this.createUrl('/applications')));
      this.$applications.next(res);
    }
  }

  async getAllOrganisations(user: User) {
    if (user.superAdmin) {
      const res = await firstValueFrom(this.http.get<Organisation[]>(this.createUrl('/organisations')));
      this.$organisations.next(res);
    }
  }
}
