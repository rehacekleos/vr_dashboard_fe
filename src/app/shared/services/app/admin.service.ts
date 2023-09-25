import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { OrganisationService } from "./organisation.service";
import { HttpService } from "../http.service";
import { firstValueFrom } from "rxjs";
import { Application } from "../../../models/application.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService extends HttpService{

  constructor(private http: HttpClient) {
    super('/admin');
  }

  async getAllApplications(){
    return await firstValueFrom(this.http.get<Application[]>(this.createUrl('/applications')));
  }
}
