import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganisationRoutingModule } from './organisation-routing.module';
import { OrganisationComponent } from './organisation.component';
import {
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ContainerComponent,
  GutterDirective,
  RowComponent,
  TableDirective,
  WidgetStatCComponent
} from "@coreui/angular";
import { ComponentsModule } from "../../components/components.module";
import { ClipboardModule } from "@angular/cdk/clipboard";


@NgModule({
  declarations: [
    OrganisationComponent
  ],
  imports: [
    CommonModule,
    OrganisationRoutingModule,
    ContainerComponent,
    ComponentsModule,
    ClipboardModule,
    WidgetStatCComponent,
    RowComponent,
    GutterDirective,
    ColComponent,
    TableDirective,
    CardComponent,
    CardBodyComponent
  ]
})
export class OrganisationModule { }
