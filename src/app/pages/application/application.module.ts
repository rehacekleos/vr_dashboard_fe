import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { ColComponent, ContainerComponent, RowComponent } from "@coreui/angular";
import { ComponentsModule } from "../../components/components.module";


@NgModule({
  declarations: [
    ApplicationComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    ContainerComponent,
    RowComponent,
    ComponentsModule,
    ColComponent
  ]
})
export class ApplicationModule { }
