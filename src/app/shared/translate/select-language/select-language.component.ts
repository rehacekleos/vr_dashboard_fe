import {Component, Input, OnInit} from '@angular/core';
import {CustomTranslateService} from '../services/custom-translate.service';
import {environment} from '../../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
@Component({
    selector: 'app-select-language',
    templateUrl: './select-language.component.html',
    styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnInit {
    availableLangs: string[];
    currentLang: string;
    @Input() placement: string;
    constructor(
        private translateService: CustomTranslateService,
        private translate: TranslateService
    ) {
    }

    ngOnInit(): void {
        this.currentLang = this.translate.currentLang;
        this.availableLangs = environment.availableLanguages.slice();
        this.availableLangs.splice(environment.availableLanguages.indexOf(this.currentLang), 1);
    }
    selectLanguage(language){
        this.translateService.selectLanguage(language).subscribe(() => {
            this.availableLangs.unshift(this.currentLang);
            this.availableLangs.splice(this.availableLangs.indexOf(language), 1);
            this.currentLang = language;
        })
    }

}
