import { Injectable } from '@angular/core';
import { HttpService } from "../http.service";
import { AcceptInvitation, Invitation, NewInvitation } from "../../../models/invitation.model";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { OrganisationService } from "./organisation.service";

@Injectable({
  providedIn: 'root'
})
export class InvitationService extends HttpService{

  $invitations: BehaviorSubject<Invitation[]> = new BehaviorSubject<Invitation[]>(undefined);

  constructor(private http: HttpClient,
              private orgService: OrganisationService) {
    super('/invitation');

    this.orgService.$selectedOrganisation.subscribe(async o => {
      if (o){
        await this.getInvitations();
      }
    })
  }

  async getInvitations(){
    const [res] = await Promise.all([firstValueFrom(this.http.get<Invitation[]>(this.createUrl('')))]);
    this.$invitations.next(res)
  }

  async acceptInvitation(body: AcceptInvitation) {
    const res = firstValueFrom(this.http.post(this.createUrl('/accept'), body));
    await this.orgService.getOrganisations();
    return res;
  }

  async createInvitation(body: NewInvitation){
    const res = await firstValueFrom(this.http.post<Invitation>(this.createUrl(''), body));
    await this.getInvitations();
    return res;
  }

  async refreshInvitation(id: string) {
    await firstValueFrom(this.http.patch<Invitation>(this.createUrl(`/${id}`), {}));
    await this.getInvitations();
  }

  async deleteInvitation(id: string) {
    await firstValueFrom(this.http.delete<Invitation>(this.createUrl(`/${id}`), {}));
    await this.getInvitations();
  }
}
