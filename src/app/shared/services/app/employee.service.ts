import { Injectable } from '@angular/core';
import { HttpService } from "../http.service";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { Employee } from "../../../models/employee.model";
import { OrganisationService } from "./organisation.service";
import { RoleNames } from "../../../models/role.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends HttpService{

  $employees: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>(undefined);
  $employee: BehaviorSubject<Employee> = new BehaviorSubject<Employee>(undefined);

  constructor(private http: HttpClient,
              private orgService: OrganisationService) {
    super('/employee');

    this.orgService.$selectedOrganisation.subscribe(async o => {
      if (o) {
        await Promise.all([this.getEmployees(), this.getEmployeeForUser()]);
      }
    })
  }

  async getEmployees() {
    const res = await firstValueFrom(this.http.get<Employee[]>(this.createUrl('')));
    this.$employees.next(res)
  }

  async getEmployeeForUser() {
    const res = await firstValueFrom(this.http.get<Employee>(this.createUrl('/user')));
    this.$employee.next(res)
  }

  async changeRole(emp: Employee, role: RoleNames) {
    await firstValueFrom(this.http.patch(this.createUrl("/role"), {employeeId: emp.id, roleName: role}));
    await this.getEmployees();
  }

  async deleteEmployee(id: string) {
    await firstValueFrom(this.http.delete(this.createUrl(`/${id}`)));
    await this.getEmployees();
  }

  async changeAssignment(emp: Employee, participants: string[]) {
    await firstValueFrom(this.http.put(this.createUrl("/assignment"), {employeeId: emp.id, participants: participants}));
    await this.getEmployees();
  }
}
