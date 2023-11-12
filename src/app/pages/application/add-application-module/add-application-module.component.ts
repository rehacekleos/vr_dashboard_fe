import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from "rxjs";
import { AddModule, Application, NewApplication } from "../../../models/application.model";
import { ApplicationService } from "../../../shared/services/app/application.service";
import { TranslateComponent } from "../../../shared/translate/translate.component";
import { NgForm } from "@angular/forms";
import { FileUtil } from "../../../shared/utils/fileUtil";

@Component({
  selector: 'app-add-application-module',
  templateUrl: './add-application-module.component.html',
  styleUrls: ['./add-application-module.component.scss']
})
export class AddApplicationModuleComponent extends TranslateComponent{

  validated = false;
  file: File;

  moduleVersion: string;

  @Input({required: true}) open: boolean;
  @Input({required: true}) application: Application;
  @Output() visibleChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private applicationService: ApplicationService) {
    super()
  }

  private resetForm(){
    this.file = undefined;
    this.moduleVersion = undefined;
    this.validated = false;
  }

  visibleChange($event: boolean) {
    this.resetForm();
    this.visibleChanged.emit($event);
  }

  async onSubmit(form: NgForm) {
    this.validated = true;
    if (form.valid && this.file) {
      try {
        const arrayBuffer = await this.file.arrayBuffer();
        const base64String = FileUtil.arrayBufferToBase64(arrayBuffer);
        const addModule: AddModule = {
          module: base64String,
          module_version: this.moduleVersion
        }
        await this.applicationService.addModule(this.application.id, addModule);
        this.visibleChanged.emit(false);
        this.resetForm();
      } catch (e) {
        this.validated = false;
      }
    }
  }

  onFileSelected($event) {
    this.file = $event.target.files[0];
  }

  onSubmitButton(newModuleForm: NgForm) {
    newModuleForm.ngSubmit.emit(true);
  }
}
