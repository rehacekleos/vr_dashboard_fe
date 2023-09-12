import { Injectable } from '@angular/core';
import { HttpService } from "../http.service";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { Employee } from "../../../models/employee.model";
import { OrganisationService } from "./organisation.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends HttpService{

  $employees: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>(undefined);

  constructor(private http: HttpClient,
              private orgService: OrganisationService) {
    super('/employee');

    this.orgService.$selectedOrganisation.subscribe(async o => {
      if (o) {
        await this.getEmployees();
      }
    })
  }

  async getEmployees() {
    const res = await firstValueFrom(this.http.get<Employee[]>(this.createUrl('')));
    this.$employees.next(res)
  }
}
