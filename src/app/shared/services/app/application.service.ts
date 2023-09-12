import { Injectable } from '@angular/core';
import { HttpService } from "../http.service";
import { HttpClient } from "@angular/common/http";
import { OrganisationService } from "./organisation.service";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { Application, NewApplication } from "../../../models/application.model";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService extends HttpService{

  $applications: BehaviorSubject<Application[]> = new BehaviorSubject<Application[]>(undefined);

  constructor(private http: HttpClient,
              private orgService: OrganisationService) {
    super('/application');

    this.orgService.$selectedOrganisation.subscribe(async o => {
      await this.getApplications();
    })
  }

  async getApplications(){
    const res = await firstValueFrom(this.http.get<Application[]>(this.createUrl('')));
    this.$applications.next(res);
  }

  async createApplication(body: NewApplication) {
    const res = await firstValueFrom(this.http.post<Application[]>(this.createUrl(''), body));
    await this.getApplications();
    return res;
  }
}
