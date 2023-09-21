import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NoOrganisationComponent } from './no-organisation/no-organisation.component';
import {
    AlertComponent,
    ButtonDirective,
    CardComponent,
    ColComponent,
    ContainerComponent,
    FormControlDirective, FormDirective, FormFeedbackComponent, GutterDirective, InputGroupComponent, InputGroupTextDirective,
    RowComponent
} from "@coreui/angular";
import { ComponentsModule } from "../components/components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { SharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [DashboardComponent, NoOrganisationComponent],
    exports: [
        NoOrganisationComponent
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        ContainerComponent,
        RowComponent,
        CardComponent,
        ColComponent,
        AlertComponent,
        ButtonDirective,
        ComponentsModule,
        FormControlDirective,
        FormDirective,
        FormFeedbackComponent,
        FormsModule,
        InputGroupComponent,
        InputGroupTextDirective,
        ReactiveFormsModule,
        GutterDirective,
        NgxSkeletonLoaderModule,
        SharedModule
    ]
})
export class PagesModule { }
