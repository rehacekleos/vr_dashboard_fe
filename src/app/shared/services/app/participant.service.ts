import { Injectable } from '@angular/core';
import { HttpService } from "../http.service";
import { HttpClient } from "@angular/common/http";
import { AcceptInvitation } from "../../../models/invitation.model";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { NewParticipant, Participant } from "../../../models/participant.model";
import { OrganisationService } from "./organisation.service";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService extends HttpService{

  $participants: BehaviorSubject<Participant[]> = new BehaviorSubject<Participant[]>(undefined);
  $allParticipants: BehaviorSubject<Participant[]> = new BehaviorSubject<Participant[]>(undefined);

  constructor(private http: HttpClient,
              private orgService: OrganisationService) {
    super('/participant');

    this.orgService.$selectedOrganisation.subscribe(async o => {
      if (o) {
        await this.getParticipants();
        await this.getAllParticipants();
      }
    })
  }

  async getParticipants() {
    const res = await firstValueFrom(this.http.get<Participant[]>(this.createUrl('')));
    this.$participants.next(res);
    return res;
  }

  async getAllParticipants() {
    const res = await firstValueFrom(this.http.get<Participant[]>(this.createUrl('/organisation')));
    this.$allParticipants.next(res);
    return res;
  }

  async createParticipant(body: NewParticipant): Promise<Participant> {
    const res = await firstValueFrom(this.http.post<Participant>(this.createUrl(''), body));
    await this.getParticipants();
    return res;
  }

  async getParticipant(id: string): Promise<Participant> {
    return await firstValueFrom(this.http.get<Participant>(this.createUrl(`/${id}`)));
  }

  async updateParticipant(body: Participant) {
    await firstValueFrom(this.http.put(this.createUrl(''), body));
    await this.getParticipants();
  }

  async deleteParticipant(id: string) {
    await firstValueFrom(this.http.delete(this.createUrl(`/${id}`)));
    await this.getParticipants();
  }

}
