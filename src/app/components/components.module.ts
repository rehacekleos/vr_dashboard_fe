import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { IconifyComponent } from "./iconify/iconify.component";
import { WidgetComponent } from './widget/widget.component';
import {
    AlertComponent,
    ButtonCloseDirective,
    ButtonDirective,
    ButtonGroupComponent,
    CardBodyComponent,
    CardComponent,
    CardFooterComponent,
    ColComponent, FormCheckInputDirective,
    FormControlDirective,
    FormDirective,
    FormFeedbackComponent, FormSelectDirective,
    InputGroupComponent, InputGroupTextDirective,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    PageItemDirective,
    PageLinkDirective,
    PaginationComponent,
    RowComponent,
    TableDirective, TooltipDirective
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
import { DescriptionDetailComponent } from './description-detail/description-detail.component';
import { JsonEditorComponent } from './json-editor/json-editor.component';
import { MonacoEditorModule } from "ngx-monaco-editor-v2";
import { PositionComponent } from './charts/position/position.component';
import { ApplicationModuleComponent } from './application-module/application-module.component';
import { RotationPolarChartComponent } from './charts/rotation-polar-chart/rotation-polar-chart.component';
import { ActivitiesStatisticsComponent } from './activities-statistics/activities-statistics.component';
import { RecordsStatisticsComponent } from "./records-statistics/records-statistics.component";
import { PositionalDifferentialComponent } from './charts/positional-differential/positional-differential.component';
import { HeatmapComponent } from './charts/heatmap/heatmap.component';
import { NgApexchartsModule } from "ng-apexcharts";



@NgModule({
  declarations: [IconifyComponent, WidgetComponent, ApplicationWidgetComponent, ConfirmationModalComponent, OrganisationWidgetComponent, CreateOrganisationFormComponent, JoinOrganisationFormComponent, LoadingPlaceholderComponent, ActivityTableComponent, BooleanIconComponent, RotationComponent, DescriptionDetailComponent, JsonEditorComponent, PositionComponent, ApplicationModuleComponent, RotationPolarChartComponent, ActivitiesStatisticsComponent, RecordsStatisticsComponent, PositionalDifferentialComponent, HeatmapComponent],
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
    JsonEditorComponent,
    PositionComponent,
    ApplicationModuleComponent,
    RotationPolarChartComponent,
    ActivitiesStatisticsComponent,
    RecordsStatisticsComponent,
    PositionalDifferentialComponent,
    HeatmapComponent
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
        MonacoEditorModule,
        CardFooterComponent,
        PaginationComponent,
        PageItemDirective,
        PageLinkDirective,
        FormSelectDirective,
        InputGroupTextDirective,
        NgApexchartsModule,
        FormCheckInputDirective,
        TooltipDirective
    ],
  providers: [
    TitleCasePipe
  ]
})
export class ComponentsModule { }
