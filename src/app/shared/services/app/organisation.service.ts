import { HttpService } from "../http.service";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { NewOrganisation, Organisation } from "../../../models/organisation.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class OrganisationService extends HttpService{

  $organisations: BehaviorSubject<Organisation[]> = new BehaviorSubject<Organisation[]>(undefined);
  organisations: Organisation[];

  $selectedOrganisation: BehaviorSubject<Organisation> = new BehaviorSubject<Organisation>(undefined);

  constructor(private http: HttpClient,) {
    super('/organisation');

    this.$organisations.subscribe(val => {
      this.organisations = val;
      if (val?.length > 0 && this.$selectedOrganisation.getValue() === undefined){
        this.$selectedOrganisation.next(val[0]);
      }
    })
  }

  async getOrganisations(){
    const res = await firstValueFrom(this.http.get<Organisation[]>(this.createUrl('')));
    this.$organisations.next(res);
    return res;
  }

  async createOrganisation(newOrg: NewOrganisation){
    const res = await firstValueFrom(this.http.post<Organisation>(this.createUrl(''), newOrg));
    await this.getOrganisations();
    this.$selectedOrganisation.next(res);
  }

  async getOrganisation(id: any) {
    const res = await firstValueFrom(this.http.get<Organisation>(this.createUrl(`/${id}`)));
    this.$selectedOrganisation.next(res);
    return res;
  }
}
