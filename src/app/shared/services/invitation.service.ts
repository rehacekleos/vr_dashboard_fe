import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";
import { AcceptInvitation } from "../../models/invitation.model";
import { firstValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { OrganisationService } from "./organisation.service";

@Injectable({
  providedIn: 'root'
})
export class InvitationService extends HttpService{

  constructor(private http: HttpClient,
              private orgService: OrganisationService) {
    super('/invitation');
  }

  async acceptInvitation(body: AcceptInvitation) {
    const res = firstValueFrom(this.http.post('/accept', body));
    await this.orgService.getOrganisations();
  }
}
