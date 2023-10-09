import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconifyComponent } from "./iconify/iconify.component";
import { WidgetComponent } from './widget/widget.component';
import {
    AlertComponent,
    ButtonCloseDirective,
    ButtonDirective, ButtonGroupComponent,
    CardBodyComponent,
    CardComponent, ColComponent, FormControlDirective, FormDirective, FormFeedbackComponent, InputGroupComponent,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective, RowComponent, TableDirective
} from "@coreui/angular";
import { ApplicationWidgetComponent } from './application-widget/application-widget.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { OrganisationWidgetComponent } from './organisation-widget/organisation-widget.component';
import { CreateOrganisationFormComponent } from './create-or-join-organisation/create-organisation-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { JoinOrganisationFormComponent } from './join-organisation-form/join-organisation-form.component';
import { LoadingPlaceholderComponent } from './loading-placeholder/loading-placeholder.component';
import { ActivityTableComponent } from './table/activity-table/activity-table.component';
import { BooleanIconComponent } from './boolean-icon/boolean-icon.component';
import { RotationComponent } from './charts/rotation/rotation.component';
import { NgChartsModule } from "ng2-charts";
import { DescriptionDetailComponent } from './description-detail/description-detail.component';
import { JsonEditorComponent } from './json-editor/json-editor.component';
import { MonacoEditorModule } from "ngx-monaco-editor-v2";



@NgModule({
  declarations: [IconifyComponent, WidgetComponent, ApplicationWidgetComponent, ConfirmationModalComponent, OrganisationWidgetComponent, CreateOrganisationFormComponent, JoinOrganisationFormComponent, LoadingPlaceholderComponent, ActivityTableComponent, BooleanIconComponent, RotationComponent, DescriptionDetailComponent, JsonEditorComponent],
  exports: [
    IconifyComponent,
    WidgetComponent,
    ApplicationWidgetComponent,
    ConfirmationModalComponent,
    OrganisationWidgetComponent,
    CreateOrganisationFormComponent,
    JoinOrganisationFormComponent,
    LoadingPlaceholderComponent,
    ActivityTableComponent,
    BooleanIconComponent,
    RotationComponent,
    DescriptionDetailComponent,
    JsonEditorComponent
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
    SharedModule,
    InputGroupComponent,
    FormFeedbackComponent,
    TableDirective,
    NgChartsModule,
    MonacoEditorModule
  ]
})
export class ComponentsModule { }
