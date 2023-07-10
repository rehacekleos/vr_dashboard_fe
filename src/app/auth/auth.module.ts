import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {
  AlertComponent,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective, FormDirective, FormFeedbackComponent, FormModule, GutterDirective, InputGroupComponent, InputGroupTextDirective, RowComponent
} from "@coreui/angular";
import { IconDirective } from "@coreui/icons-angular";
import { RouterLink } from "@angular/router";
import { AuthRoutingModule } from "./auth-routing.module";
import { AppModule } from "../app.module";
import { ComponentsModule } from "../components/components.module";
import { FormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ButtonDirective,
    CardBodyComponent,
    CardComponent,
    CardGroupComponent,
    ColComponent,
    ContainerComponent,
    FormControlDirective,
    FormDirective,
    IconDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    RouterLink,
    RowComponent,
    ComponentsModule,
    FormsModule,
    FormModule,
    FormFeedbackComponent,
    AlertComponent,
    GutterDirective
  ]
})
export class AuthModule { }
