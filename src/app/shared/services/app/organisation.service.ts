import { HttpService } from "../http.service";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { NewOrganisation, Organisation } from "../../../models/organisation.model";
import { Injectable } from "@angular/core";
import { AdminService } from "./admin.service";

@Injectable({
  providedIn: 'root'
})
export class OrganisationService extends HttpService{

  $organisations: BehaviorSubject<Organisation[]> = new BehaviorSubject<Organisation[]>(undefined);
  organisations: Organisation[];

  $selectedOrganisation: BehaviorSubject<Organisation> = new BehaviorSubject<Organisation>(undefined);

  constructor(private http: HttpClient,
              private adminService: AdminService) {
    super('/organisation');

    this.$organisations.subscribe(val => {
      this.organisations = val;
      if (val?.length > 0 && this.$selectedOrganisation.getValue() === undefined){

        const storageOrgId = window.localStorage.getItem("organisation")
        if (storageOrgId) {
          const findOrg = this.organisations.find(o => o.id === storageOrgId);
          if (findOrg){
            this.$selectedOrganisation.next(findOrg);
            return;
          }
        }
        this.$selectedOrganisation.next(this.organisations[0]);
      }
    })

    this.$selectedOrganisation.subscribe(val => {
      if (val) {
        window.localStorage.setItem("organisation", val.id);
      }
    })
  }

  async getOrganisations(): Promise<Organisation[]>{
    const res = await firstValueFrom(this.http.get(this.createUrl(''))) as Organisation[];
    this.$organisations.next(res);
    return res;
  }

  async createOrganisation(newOrg: NewOrganisation){
    const res = await firstValueFrom(this.http.post<Organisation>(this.createUrl(''), newOrg));
    this.$selectedOrganisation.next(res);
    await this.getOrganisations();
    await this.adminService.getAllOrganisations();
  }


  async getOrganisation(id: any) {
    const res = await firstValueFrom(this.http.get<Organisation>(this.createUrl(`/${id}`)));
    this.$selectedOrganisation.next(res);
    return res;
  }
}
