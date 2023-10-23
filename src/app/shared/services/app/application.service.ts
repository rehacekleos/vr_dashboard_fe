import { Injectable } from '@angular/core';
import { HttpService } from "../http.service";
import { HttpClient } from "@angular/common/http";
import { OrganisationService } from "./organisation.service";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { AddModule, Application, NewApplication } from "../../../models/application.model";
import { AdminService } from "./admin.service";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService extends HttpService {

  $applications: BehaviorSubject<Application[]> = new BehaviorSubject<Application[]>(undefined);

  constructor(private http: HttpClient,
              private adminService: AdminService,
              private orgService: OrganisationService) {
    super('/application');

    this.orgService.$selectedOrganisation.subscribe(async o => {
      await this.getApplications();
    })
  }

  async getApplications() {
    const res = await firstValueFrom(this.http.get<Application[]>(this.createUrl('')));
    this.$applications.next(res);
  }

  async createApplication(body: NewApplication) {
    await firstValueFrom(this.http.post<Application[]>(this.createUrl(''), body));
    await this.getApplications();
    await this.adminService.getAllApplications();
  }

  async assignApplication(applicationId: string) {
    await firstValueFrom(this.http.post<Application[]>(this.createUrl(`/${applicationId}/assign`), null));
    await this.getApplications();
  }

  async getApplication(applicationId: any) {
    return await firstValueFrom(this.http.get<Application>(this.createUrl(`/${applicationId}`)));
  }

  async deleteApplication(id: string) {
    await firstValueFrom(this.http.delete(this.createUrl(`/${id}`)));
  }

  async updateApplicationSetting(id: string, settings: any) {
    await firstValueFrom(this.http.patch(this.createUrl(`/${id}/settings`), {settings: settings}));
  }

  async addModule(id: string, addModule: AddModule) {
    console.log(addModule)
    await firstValueFrom(this.http.put<Application[]>(this.createUrl(`/${id}/add/module`), addModule));
  }
}
