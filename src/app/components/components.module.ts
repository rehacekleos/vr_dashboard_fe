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



@NgModule({
  declarations: [IconifyComponent, WidgetComponent, ApplicationWidgetComponent, ConfirmationModalComponent, OrganisationWidgetComponent, CreateOrganisationFormComponent, JoinOrganisationFormComponent, LoadingPlaceholderComponent, ActivityTableComponent],
  exports: [
    IconifyComponent,
    WidgetComponent,
    ApplicationWidgetComponent,
    ConfirmationModalComponent,
    OrganisationWidgetComponent,
    CreateOrganisationFormComponent,
    JoinOrganisationFormComponent,
    LoadingPlaceholderComponent,
    ActivityTableComponent
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
        TableDirective
    ]
})
export class ComponentsModule { }
