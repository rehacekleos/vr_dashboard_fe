import { Component, OnInit } from '@angular/core';
import { Organisation } from "../../models/organisation.model";
import { OrganisationService } from "../../shared/services/app/organisation.service";
import { ParticipantService } from "../../shared/services/app/participant.service";
import { Participant } from "../../models/participant.model";
import { EmployeeService } from "../../shared/services/app/employee.service";
import { Employee } from "../../models/employee.model";
import { ActivityService } from "../../shared/services/app/activity.service";
import { Activity } from "../../models/activity.model";
import { ApplicationService } from "../../shared/services/app/application.service";
import { Application } from "../../models/application.model";
import { TranslateComponent } from "../../shared/translate/translate.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends TranslateComponent implements OnInit {

  applications: Application[];
  participants: Participant[];
  employees: Employee[];
  activities: Activity[];

  constructor(private applicationService: ApplicationService,
              private participantService: ParticipantService,
              private activityService: ActivityService,
              private employeeService: EmployeeService) {
    super()
  }

  async ngOnInit(): Promise<void> {
    this.applicationService.$applications.subscribe(a => {
      this.applications = a;
    })

    this.participantService.$participants.subscribe(p => {
      this.participants = p;
    })

    this.employeeService.$employees.subscribe(e => {
      this.employees = e;
    })

    this.activityService.$activities.subscribe(a => {
      this.activities = a;
    })
  }

}
