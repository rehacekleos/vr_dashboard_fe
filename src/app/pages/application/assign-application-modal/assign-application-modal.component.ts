import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ApplicationService } from "../../../shared/services/app/application.service";
import { Application, NewApplication } from "../../../models/application.model";
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { NgForm } from "@angular/forms";
import { AdminService } from "../../../shared/services/app/admin.service";
import { combineLatest, combineLatestAll } from "rxjs";

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
        await this.adminService.getAllApplications();
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
        this.visibleChanged.emit(false);
      } catch (e) {
        this.validated = false;
        console.log(e);
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
