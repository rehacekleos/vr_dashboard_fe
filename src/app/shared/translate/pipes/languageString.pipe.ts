import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'getLanguageString',
})
export class LanguageStringPipe implements PipeTransform {

    transform(value: string, ...args: unknown[]): string {
        switch (value){
            case 'cs':
                return 'Čeština'
            case 'en':
                return 'English'
            case 'es':
                return 'Español'
        }
        return value;
    }
}
