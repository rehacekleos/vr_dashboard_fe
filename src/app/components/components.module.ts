import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconifyComponent } from "./iconify/iconify.component";
import { WidgetComponent } from './widget/widget.component';
import { CardBodyComponent, CardComponent } from "@coreui/angular";
import { ApplicationWidgetComponent } from './application-widget/application-widget.component';



@NgModule({
  declarations: [IconifyComponent, WidgetComponent, ApplicationWidgetComponent],
  exports: [
    IconifyComponent,
    WidgetComponent,
    ApplicationWidgetComponent
  ],
  imports: [
    CommonModule,
    CardComponent,
    CardBodyComponent
  ]
})
export class ComponentsModule { }
