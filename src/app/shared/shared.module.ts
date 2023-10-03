import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageStringPipe } from "./translate/pipes/languageString.pipe";
import { SelectLanguageComponent } from "./translate/select-language/select-language.component";
import { TranslatePipeCustom } from "./translate/pipes/translate.pipe";
import { DropdownComponent, DropdownItemDirective, DropdownMenuDirective, DropdownToggleDirective } from "@coreui/angular";
import { LocalizedDatePipe } from "./translate/pipes/customDate.pipe";



@NgModule({
    declarations: [
        LanguageStringPipe,
        SelectLanguageComponent,
        TranslatePipeCustom,
        LocalizedDatePipe,
    ],
    exports: [
        TranslatePipeCustom,
        SelectLanguageComponent,
        LocalizedDatePipe
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
