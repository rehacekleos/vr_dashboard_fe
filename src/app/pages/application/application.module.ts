import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import {
  ButtonCloseDirective,
  ButtonDirective,
  ColComponent,
  ContainerComponent, FormControlDirective, FormDirective, FormFeedbackComponent, FormSelectDirective, InputGroupComponent,
  ModalBodyComponent,
  ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective,
  RowComponent
} from "@coreui/angular";
import { ComponentsModule } from "../../components/components.module";
import { NewApplicationModalComponent } from './new-application-modal/new-application-modal.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    ApplicationComponent,
    NewApplicationModalComponent,
    ApplicationFormComponent
  ],
    imports: [
        CommonModule,
        ApplicationRoutingModule,
        ContainerComponent,
        RowComponent,
        ComponentsModule,
        ColComponent,
        ButtonCloseDirective,
        ButtonDirective,
        ModalBodyComponent,
        ModalComponent,
        ModalFooterComponent,
        ModalHeaderComponent,
        ModalTitleDirective,
        FormControlDirective,
        FormDirective,
        FormFeedbackComponent,
        FormSelectDirective,
        FormsModule,
        InputGroupComponent,
        SharedModule
    ]
})
export class ApplicationModule { }
