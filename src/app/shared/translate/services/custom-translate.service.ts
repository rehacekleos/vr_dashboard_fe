import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {
    TranslateCompiler,
    TranslateLoader, TranslateParser,
    TranslateService, TranslateStore,
} from '@ngx-translate/core';
import {environment} from '../../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {TranslationsMap} from '../translate.model';

import {registerLocaleData} from '@angular/common';
import localeCs from '@angular/common/locales/cs'
import localeEs from '@angular/common/locales/es'
import {CustomMissingTranslationHandler} from './missingTranslationHandler.service';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@Injectable({
    providedIn: 'root'
})
export class CustomTranslateService extends TranslateService{

    public $languageChanged: Subject<void> = new Subject<void>()

    constructor(
        // private translateService: TranslateService,
        public store: TranslateStore,
        private loader: TranslateLoader,
        public compiler: TranslateCompiler,
        public parser: TranslateParser,
        public missingTranslationHandler: CustomMissingTranslationHandler

    ) {
        super(
            store,
            loader,
            compiler,
            parser,
            missingTranslationHandler,
            !environment.languageDebug,
            false,
            false,
            environment.defaultLanguage
        );
        super.addLangs(environment.availableLanguages);
        registerLocaleData(localeEs);
        registerLocaleData(localeCs);
        super.use(environment.defaultLanguage);
    }

    selectLanguage(language: string): Observable<any>{
        this.$languageChanged.next();
        return super.use(language);
    }

    instantTranslation(inputString: any, interpolateParams?: object): string{
        if (TranslationsMap.has(inputString)){
            return super.instant(inputString, interpolateParams);
        }
        return inputString
    }


}

// Translate Navod:
// 	Vsude kde neni NUTNE potreba asynchroni preklad pouzivat TranslatePipeCustom
// 		- v .html pouzivat ve formatu '<p>Translations.foo.baz | translation</p>'
// 		- v .ts pouzivat ve formatu 'this.translateService.instant(Translations.foo.baz)'
//
// 	V pripade pouziti parametru je variable oznacena _$ na konci
// 		- v .html pouzivat ve formatu '<p>Translations.bar_$ | translation:{ param: x-y }</p>'
// 		- v .ts pouzivat ve formatu 'this.translateService.instant(Translations.bar_$, { param: x-y })'
//
// 	V pripade nutnosti asynchroniho prekladu pouzit async metodu CustomTranslateService.getTranslation()
//
//
//
//  Translations => Translations
//
//  Tool na hlednani chybejicich klicu v jazykovych JSONech vuci anglictine. (npm run test_languages)
