import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParticipantRoutingModule } from './participant-routing.module';
import { ParticipantComponent } from './participant.component';
import {
    AlertComponent,
    ButtonCloseDirective,
    ButtonDirective,
    CardBodyComponent,
    CardComponent, CardFooterComponent,
    ColComponent,
    ContainerComponent,
    FormControlDirective,
    FormDirective,
    FormFeedbackComponent,
    FormSelectDirective, ImgDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalTitleDirective,
    RowComponent,
    TableDirective
} from "@coreui/angular";
import { ComponentsModule } from "../../components/components.module";
import { NewParticipantModalComponent } from './new-participant-modal/new-participant-modal.component';
import { FormsModule } from "@angular/forms";
import { ParticipantFormComponent } from './participant-form/participant-form.component';
import { ParticipantDetailComponent } from './participant-detail/participant-detail.component';
import { ParticipantEditComponent } from './participant-edit/participant-edit.component';


@NgModule({
  declarations: [
    ParticipantComponent,
    NewParticipantModalComponent,
    ParticipantFormComponent,
    ParticipantDetailComponent,
    ParticipantEditComponent
  ],
    imports: [
        CommonModule,
        ParticipantRoutingModule,
        ContainerComponent,
        CardBodyComponent,
        CardComponent,
        ColComponent,
        ComponentsModule,
        RowComponent,
        TableDirective,
        ModalComponent,
        ModalHeaderComponent,
        ModalTitleDirective,
        ModalBodyComponent,
        ModalFooterComponent,
        ButtonCloseDirective,
        ButtonDirective,
        FormControlDirective,
        FormDirective,
        FormFeedbackComponent,
        FormsModule,
        InputGroupComponent,
        InputGroupTextDirective,
        FormSelectDirective,
        ImgDirective,
        CardFooterComponent,
        AlertComponent
    ]
})
export class ParticipantModule { }
