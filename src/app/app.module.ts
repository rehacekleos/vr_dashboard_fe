import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgScrollbarModule } from 'ngx-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';
import { DefaultHeaderComponent, DefaultLayoutComponent } from "./containers";
import {
  AvatarModule, BadgeModule,
  BreadcrumbModule, ButtonGroupModule,
  ButtonModule, CardModule,
  DropdownModule,
  FooterModule, FormModule,
  GridModule,
  HeaderModule, ListGroupModule,
  NavModule, ProgressModule, SharedModule,
  SidebarModule, TabsModule, TooltipDirective, UtilitiesModule
} from "@coreui/angular";
import { IconModule, IconSetService } from "@coreui/icons-angular";
import { ComponentsModule } from "./components/components.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "./guards/auth.guard";
import { OrganisationsGuard } from "./guards/organisations.guard";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { CustomToastrService } from "./shared/services/custom-toastr.service";
import { ToastrModule } from "ngx-toastr";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { OrganisationInterceptor } from "./interceptors/organisation.interceptor";



@NgModule({
  declarations: [AppComponent,
    DefaultHeaderComponent,
    DefaultLayoutComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule,
    ComponentsModule,
    FormsModule,
    HttpClientModule,
    TooltipDirective,
    ToastrModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: OrganisationInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    IconSetService,
    Title,
    AuthGuard,
    OrganisationsGuard
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
