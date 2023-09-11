import { Component, OnInit } from '@angular/core';
import { Application } from "../../models/application.model";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit{

  applications: Application[] = [
    {
      name: "test",
      code: "dsadsad",
      id: "1",
      setting: {},
      organisationId: ""
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }



}
