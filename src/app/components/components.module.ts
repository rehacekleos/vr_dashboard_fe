import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconifyComponent } from "./iconify/iconify.component";
import { WidgetComponent } from './widget/widget.component';
import {
  AlertComponent,
  ButtonCloseDirective,
  ButtonDirective, ButtonGroupComponent,
  CardBodyComponent,
  CardComponent, ColComponent, FormControlDirective, FormDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, RowComponent
} from "@coreui/angular";
import { ApplicationWidgetComponent } from './application-widget/application-widget.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { OrganisationWidgetComponent } from './organisation-widget/organisation-widget.component';
import { CreateOrJoinOrganisationComponent } from './create-or-join-organisation/create-or-join-organisation.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";



@NgModule({
  declarations: [IconifyComponent, WidgetComponent, ApplicationWidgetComponent, ConfirmationModalComponent, OrganisationWidgetComponent, CreateOrJoinOrganisationComponent],
  exports: [
    IconifyComponent,
    WidgetComponent,
    ApplicationWidgetComponent,
    ConfirmationModalComponent,
    OrganisationWidgetComponent,
    CreateOrJoinOrganisationComponent
  ],
    imports: [
        CommonModule,
        CardComponent,
        CardBodyComponent,
        ButtonCloseDirective,
        ButtonDirective,
        ModalBodyComponent,
        ModalComponent,
        ModalFooterComponent,
        ModalHeaderComponent,
        ModalTitleDirective,
        AlertComponent,
        ColComponent,
        FormControlDirective,
        FormDirective,
        FormsModule,
        ReactiveFormsModule,
        RowComponent,
        ButtonGroupComponent,
        SharedModule
    ]
})
export class ComponentsModule { }
