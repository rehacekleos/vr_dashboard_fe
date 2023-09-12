import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconifyComponent } from "./iconify/iconify.component";
import { WidgetComponent } from './widget/widget.component';
import {
    ButtonCloseDirective,
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    ModalBodyComponent,
    ModalComponent,
    ModalFooterComponent, ModalHeaderComponent, ModalTitleDirective
} from "@coreui/angular";
import { ApplicationWidgetComponent } from './application-widget/application-widget.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';



@NgModule({
  declarations: [IconifyComponent, WidgetComponent, ApplicationWidgetComponent, ConfirmationModalComponent],
  exports: [
    IconifyComponent,
    WidgetComponent,
    ApplicationWidgetComponent,
    ConfirmationModalComponent
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
        ModalTitleDirective
    ]
})
export class ComponentsModule { }
