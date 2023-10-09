import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import {
    ButtonCloseDirective,
    ButtonDirective, CardBodyComponent, CardComponent,
    ColComponent,
    ContainerComponent, FormControlDirective, FormDirective, FormFeedbackComponent, FormSelectDirective, GutterDirective, InputGroupComponent,
    ModalBodyComponent,
    ModalComponent, ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective,
    RowComponent
} from "@coreui/angular";
import { ComponentsModule } from "../../components/components.module";
import { NewApplicationModalComponent } from './new-application-modal/new-application-modal.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { AssignApplicationModalComponent } from './assign-application-modal/assign-application-modal.component';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';


@NgModule({
    declarations: [
        ApplicationComponent,
        NewApplicationModalComponent,
        ApplicationFormComponent,
        AssignApplicationModalComponent,
        ApplicationDetailComponent
    ],
    exports: [
        NewApplicationModalComponent
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
        SharedModule,
        GutterDirective,
        CardBodyComponent,
        CardComponent
    ]
})
export class ApplicationModule { }
