import { Component, OnInit } from '@angular/core';
import { Application } from "../../models/application.model";
import { ApplicationService } from "../../shared/services/app/application.service";
import { TranslateComponent } from "../../shared/translate/translate.component";
import { AuthService } from "../../auth/auth.service";
import { User } from "../../models/user.model";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent extends TranslateComponent implements OnInit{

  applications: Application[]
  openModal = false;

  user: User;

  constructor(private applicationService: ApplicationService,
              private authService: AuthService) {
    super()
  }

  async ngOnInit(): Promise<void> {
    this.authService.$user.subscribe(u => {
      this.user = u;
    })

    await this.applicationService.getApplications();
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
