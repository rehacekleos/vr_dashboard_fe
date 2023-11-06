import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './activity.component';
import {
    ButtonCloseDirective,
    ButtonDirective, CardBodyComponent, CardComponent,
    ColComponent,
    ContainerComponent,
    FormCheckComponent,
    FormCheckInputDirective,
    FormControlDirective,
    FormDirective,
    FormFeedbackComponent,
    FormSelectDirective, ImgDirective,
    InputGroupComponent,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    RowComponent, TableDirective
} from "@coreui/angular";
import { ComponentsModule } from "../../components/components.module";
import { NewActivityModalComponent } from './new-activity-modal/new-activity-modal.component';
import { ActivityFormComponent } from './activity-form/activity-form.component';
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivityCompareComponent } from './activity-compare/activity-compare.component';

@NgModule({
  declarations: [
    ActivityComponent,
    NewActivityModalComponent,
    ActivityFormComponent,
    ActivityDetailComponent,
    ActivityCompareComponent
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    ColComponent,
    ComponentsModule,
    ContainerComponent,
    RowComponent,
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
    FormCheckComponent,
    FormCheckInputDirective,
    SharedModule,
    CardBodyComponent,
    CardComponent,
    TableDirective,
    ImgDirective,
  ]
})
export class ActivityModule { }
