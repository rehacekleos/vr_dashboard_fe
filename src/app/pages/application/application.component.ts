import { Component, OnInit } from '@angular/core';
import { Application } from "../../models/application.model";
import { ApplicationService } from "../../shared/services/app/application.service";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit{

  applications: Application[]
  openModal = false;

  constructor(private applicationService: ApplicationService) {
  }

  ngOnInit(): void {
    this.applicationService.$applications.subscribe(a => {
      this.applications = a;
    })
  }


  invisibleChanged($event: boolean) {
    this.openModal = $event;
  }

  onOpenModal() {
    this.openModal = true;
  }
}
