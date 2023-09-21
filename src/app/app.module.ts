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
  NavModule, ProgressModule,
  SidebarModule, TabsModule, TooltipDirective, UtilitiesModule
} from "@coreui/angular";
import { IconModule, IconSetService } from "@coreui/icons-angular";
import { ComponentsModule } from "./components/components.module";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "./guards/auth.guard";
import { OrganisationsGuard } from "./guards/organisations.guard";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { ToastrModule } from "ngx-toastr";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { OrganisationInterceptor } from "./interceptors/organisation.interceptor";
import { environment } from "../environments/environment";
import { HttpLoaderFactory } from "./shared/translate/services/custom-translate.service";
import { CustomMissingTranslationHandler } from "./shared/translate/services/missingTranslationHandler.service";
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "./shared/shared.module";



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
    TranslateModule.forRoot({
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: CustomMissingTranslationHandler
      },
      isolate: false,
      useDefaultLang: !environment.languageDebug,
      defaultLanguage: environment.defaultLanguage,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule,
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
