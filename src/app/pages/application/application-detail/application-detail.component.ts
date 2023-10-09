import { Component, OnInit } from '@angular/core';
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { ApplicationService } from "../../../shared/services/app/application.service";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { Application } from "../../../models/application.model";
import { Translations } from "../../../shared/translate/translate.model";
import { TranslateService } from "@ngx-translate/core";
import { CustomTranslateService } from "../../../shared/translate/services/custom-translate.service";
import { CustomToastrService } from "../../../shared/services/custom-toastr.service";

@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.scss']
})
export class ApplicationDetailComponent extends TranslateComponent implements OnInit{

  application: Application;
  deleteModalOpen = false;
  constructor(private applicationService: ApplicationService,
              private translateService: CustomTranslateService,
              private route: ActivatedRoute,
              private toaster: CustomToastrService,
              private router: Router) {
    super()
  }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.application = await this.applicationService.getApplication(params.applicationId);
    });
  }

  getDeleteMessage() {
    return this.translateService.instantTranslation(Translations.confirm.delete.application_$, {param: this.application.identifier});

  }

  async deleteApplication() {
    try {
      await this.applicationService.deleteApplication(this.application.id);
      this.deleteModalOpen = false;
      await this.router.navigate(["activity"]);
    } catch (e) {

    }
  }

  closeConfirmModal() {
    this.deleteModalOpen = false;
  }

  openConfirmModal() {
    this.deleteModalOpen = true;
  }

  async onChangeSetting($event: any) {
    console.log($event);
    try {
      await this.applicationService.updateApplicationSetting(this.application.id, $event);
      this.toaster.showToastMessage(this.translateService.instantTranslation(Translations.messages.update.setting));
    } catch (e) {

    }
  }
}
