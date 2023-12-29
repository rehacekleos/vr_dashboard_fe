import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ApplicationService } from "../../../shared/services/app/application.service";
import { Application, NewApplication } from "../../../models/application.model";
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { NgForm } from "@angular/forms";
import { AdminService } from "../../../shared/services/app/admin.service";
import { combineLatest, combineLatestAll } from "rxjs";
import { AuthService } from "../../../auth/auth.service";
import { Translations } from "../../../shared/translate/translate.model";
import { CustomTranslateService } from "../../../shared/translate/services/custom-translate.service";
import { ActivatedRoute } from "@angular/router";
import { CustomToastrService } from "../../../shared/services/custom-toastr.service";

@Component({
  selector: 'app-assign-application-modal',
  templateUrl: './assign-application-modal.component.html',
  styleUrls: ['./assign-application-modal.component.scss']
})
export class AssignApplicationModalComponent extends TranslateComponent implements OnInit, OnChanges{
  @Input() open: boolean;
  @Output() visibleChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('assignForm') form: NgForm;
  validated = false;

  applications: Application[];
  assignedApplications: Application[];
  selectedApplication:  Application;

  init = false;

  constructor(private applicationService: ApplicationService,
              private authService: AuthService,
              private translateService: CustomTranslateService,
              private toaster: CustomToastrService,
              private adminService: AdminService) {
    super()
  }

  async ngOnInit() {

    combineLatest([this.applicationService.$applications, this.adminService.$applications]).subscribe(([assigned, all]) => {
      this.assignedApplications = assigned;
      this.applications = all;
      const filtered = this.getFilteredApplication();
      if (filtered.length > 0){
        this.selectedApplication = filtered[0];
      }
      this.init = true;
    })
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes.open) {
      this.open = changes.open.currentValue;
      if (this.open) {
        await this.adminService.getAllApplications(this.authService.getCurrentUser());
      }
    }
  }

  visibleChange($event: boolean) {
    this.visibleChanged.emit($event);
  }

  onSubmit() {
    this.form.ngSubmit.emit(true);
  }

  async onSubmitForm(form: NgForm) {
    this.validated = true;
    if (form.valid) {
      try {
        await this.applicationService.assignApplication(this.selectedApplication.id);
        this.validated = false;
        this.toaster.showToastMessage(this.translateService.instantTranslation(Translations.messages.assign.application));
        this.visibleChanged.emit(false);
      } catch (e) {
        this.validated = false;
        console.error(e);
      }
    }
  }

  getFilteredApplication() {
    if (this.assignedApplications && this.applications) {
      return this.applications.filter(a => !this.assignedApplications.find(assign => assign.id === a.id));
    }
    return [];
  }


}
