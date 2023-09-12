import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganisationRoutingModule } from './organisation-routing.module';
import { OrganisationComponent } from './organisation.component';
import {
  AlertComponent,
  ButtonCloseDirective, ButtonDirective,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ContainerComponent, FormCheckComponent, FormCheckInputDirective, FormControlDirective, FormDirective, FormFeedbackComponent, FormSelectDirective,
  GutterDirective, InputGroupComponent, ModalBodyComponent, ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective,
  RowComponent,
  TableDirective, TooltipDirective,
  WidgetStatCComponent
} from "@coreui/angular";
import { ComponentsModule } from "../../components/components.module";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { NewInvitationModalComponent } from './invitation/new-invitation-modal/new-invitation-modal.component';
import { NewInvitationFormComponent } from './invitation/new-invitation-form/new-invitation-form.component';
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    OrganisationComponent,
    NewInvitationModalComponent,
    NewInvitationFormComponent
  ],
  imports: [
    CommonModule,
    OrganisationRoutingModule,
    ContainerComponent,
    ComponentsModule,
    ClipboardModule,
    WidgetStatCComponent,
    RowComponent,
    GutterDirective,
    ColComponent,
    TableDirective,
    CardComponent,
    CardBodyComponent,
    ButtonCloseDirective,
    ButtonDirective,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormControlDirective,
    FormDirective,
    FormSelectDirective,
    FormsModule,
    InputGroupComponent,
    FormFeedbackComponent,
    AlertComponent,
    TooltipDirective
  ]
})
export class OrganisationModule { }
