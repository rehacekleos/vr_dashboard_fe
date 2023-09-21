import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageStringPipe } from "./translate/pipes/languageString.pipe";
import { SelectLanguageComponent } from "./translate/select-language/select-language.component";
import { TranslatePipeCustom } from "./translate/pipes/translate.pipe";
import { DropdownComponent, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective } from "@coreui/angular";



@NgModule({
  declarations: [
    LanguageStringPipe,
    SelectLanguageComponent,
    TranslatePipeCustom,
  ],
  exports: [
    TranslatePipeCustom,
    SelectLanguageComponent
  ],
  imports: [
    CommonModule,
    DropdownComponent,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownItemDirective
  ]
})
export class SharedModule { }
