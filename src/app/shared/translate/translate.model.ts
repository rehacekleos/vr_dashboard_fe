import * as translation from '../../../assets/i18n/cs.json'

export const TranslationsMap = new Set()
function objectKeysAsValues(obj, pathKeys = [] ): typeof translation{
    const ret = {};
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] !== 'object'){
            if (pathKeys.length > 0){
                ret[key] = pathKeys.join('.') + '.' + key;
                TranslationsMap.add(pathKeys.join('.') + '.' + key)
            } else {
                ret[key] = key;
                TranslationsMap.add(key)
            }
        } else if (typeof obj[key] === 'object' && key !== 'default') {
            pathKeys.push(key);
            ret[key] = objectKeysAsValues(obj[key], pathKeys);
            pathKeys.pop();
        }
    });
    return ret as typeof translation;
}

export type TranslateKey = keyof typeof translation
export const Translations = objectKeysAsValues(translation)



