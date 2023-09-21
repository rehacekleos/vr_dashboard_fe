import {ChangeDetectorRef, Injectable, Pipe, PipeTransform} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {TranslationsMap, TranslateKey} from '../translate.model';
import {CustomTranslateService} from '../services/custom-translate.service';

@Injectable({
    providedIn: 'root'
})
@Pipe({
    name: 'translation',
    pure: false
})
export class TranslatePipeCustom extends TranslatePipe implements PipeTransform {
    constructor(
        private translateService: CustomTranslateService,
        private cd: ChangeDetectorRef
    ) {
        super(translateService, cd);
    }

    transform(value: TranslateKey | any, ...args: unknown[]): string {

        if (TranslationsMap.has(value)){
            return super.transform(value, ...args);
        } else {
            return value
        }
    }
}
