import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ColComponent, ContainerComponent, RowComponent } from "@coreui/angular";
import { ComponentsModule } from "../../components/components.module";
import { SharedModule } from "../../shared/shared.module";
import { ApplicationModule } from "../application/application.module";


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ColComponent,
    ComponentsModule,
    ContainerComponent,
    RowComponent,
    SharedModule,
    ApplicationModule
  ]
})
export class AdminModule { }
