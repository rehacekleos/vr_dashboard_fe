import {MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';


@Injectable({
    providedIn: 'root'
    })
export class CustomMissingTranslationHandler implements MissingTranslationHandler{
    warned = false
    handle(params: MissingTranslationHandlerParams){
        if (!this.warned){
            console.error('Missing translation keys for language: ' + params.translateService.currentLang);
            this.warned = !this.warned;
        }
        if (environment.languageDebug){
            console.error('Missing ' + params.key);
            return '!!!~~' + params.key + '~~!!!'
        } else {
            return
        }
    }
}