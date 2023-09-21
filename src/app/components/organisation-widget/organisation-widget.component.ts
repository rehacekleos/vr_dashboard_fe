import { Component, Input } from '@angular/core';
import { Application } from "../../models/application.model";
import { Organisation } from "../../models/organisation.model";
import { Router } from "@angular/router";
import { OrganisationService } from "../../shared/services/app/organisation.service";
import { CustomToastrService } from "../../shared/services/custom-toastr.service";
import { TranslateComponent } from "../../shared/translate/translate.component";
import { CustomTranslateService } from "../../shared/translate/services/custom-translate.service";
import { Translations } from "../../shared/translate/translate.model";

@Component({
  selector: 'app-organisation-widget',
  templateUrl: './organisation-widget.component.html',
  styleUrls: ['./organisation-widget.component.scss']
})
export class OrganisationWidgetComponent extends TranslateComponent {

  constructor(private router: Router,
              private toaster: CustomToastrService,
              private translateService: CustomTranslateService,
              private organisationService: OrganisationService) {
    super()
  }

  @Input() organisation: Organisation

  async goToOrganisation() {
    await this.router.navigate(['/organisation', this.organisation.id]);
  }

  selectOrganisation() {
    if (this.organisation) {
      this.organisationService.$selectedOrganisation.next(this.organisation);
      this.toaster.showToastMessage(this.translateService.instant(Translations.messages.selected.organisation$, {param: this.organisation.name}))
    }
  }
}
