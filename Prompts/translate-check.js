const fs = require('fs');
const path = require('path')
const _ = require('lodash')


/**
 * Support script that checks if all language files have defined keys and translations.
 * It also checks if there are any extra keys in the files.
 */
class TranslateCheck {
    languageFilePath = path.join(__dirname,'../','src','assets','i18n')
    translationKeysArray = [];
    languageFiles = fs.readdirSync( this.languageFilePath )
    enFile = this.languageFiles.splice(this.languageFiles.indexOf('cs.json'), 1)
    data = fs.readFileSync(path.join( this.languageFilePath, this.enFile[0]))
    enKeys = new Array(this.JSONKeysToArray(JSON.parse(this.data)))
    enKeysSet = new Set(this.enKeys[0])
    mismatchedKeysTotal = [];
    mismatchedKeysObjectArray = [];
    languageFileKeyDiffObjectArray = [];

    constructor() {
        this.findLanguageJSONdiffs();
        this.findBadImplementations(); // saves resul to this.mismatchedKeysTotal
        this.printResults();
    }

    findLanguageJSONdiffs(){
        this.languageFiles.forEach(file => {
            const languageDiffObj = {}
            const data = fs.readFileSync(path.join(this.languageFilePath, file));
            this.translationKeysArray = [];
            const fileKeys = new Array(this.JSONKeysToArray(JSON.parse(data)));
            let difference = _.xor(this.enKeys[0], fileKeys[0]);

            const missingFileKeys = difference.filter(x => this.enKeysSet.has(x))
            const extraFileKeys = difference.filter(x => !this.enKeysSet.has(x))

            languageDiffObj.language = file;
            languageDiffObj.missingFileKeys = missingFileKeys;
            languageDiffObj.extraFileKeys = extraFileKeys;

            this.languageFileKeyDiffObjectArray.push(languageDiffObj);

        })
    }

    findBadImplementations( nestedFile = ''){
        const appFilePath = path.join(__dirname,'../','src', 'app', nestedFile);
        const mismatchedKeysTotal = [];

        const files = fs.readdirSync(appFilePath)
        files?.forEach(file => {
            const fileObject = {}
            if ( fs.lstatSync(path.join(appFilePath, file)).isFile() && ((file.includes('.ts') || file.includes('.html'))) ){
                const fileDoc = fs.readFileSync(path.join(appFilePath, file), {encoding: 'utf-8'});

                const fileDocNoComments = this.removeCommentedLines(fileDoc)

                const foundKeysInFile = this.matchKeys(fileDocNoComments);
                const mismatchedKeys = this.checkKeyExistance(foundKeysInFile);

                if (mismatchedKeys.length > 0){
                    this.mismatchedKeysTotal.push(...mismatchedKeys);

                    const keysToAdd = this.removeSpecialUsageCases(mismatchedKeys)

                    if (keysToAdd != null){
                        fileObject.fileName = file
                        fileObject.keys = keysToAdd
                        this.mismatchedKeysObjectArray.push(fileObject)
                    }

                }
            } else if (fs.lstatSync(path.join(appFilePath, file)).isDirectory()) {
                let deep = path.join(nestedFile, file)
                this.mismatchedKeysTotal.push( ...this.findBadImplementations(deep) )
            }
        })
        return mismatchedKeysTotal
    }


    JSONKeysToArray(obj, pathKeys = []){
        Object.keys(obj).forEach(key => {
            if (typeof obj[key] !== 'object'){
                if (pathKeys.length > 0){
                    this.translationKeysArray.push(pathKeys.join('.') + '.' + key)
                } else {
                    this.translationKeysArray.push(key)
                }
            } else if (typeof obj[key] === 'object' && key !== 'default') {
                pathKeys.push(key);
                this.JSONKeysToArray(obj[key], pathKeys);
                pathKeys.pop();
            }
        });

        return this.translationKeysArray;
    }


    matchKeys(fileDoc){ // fileDoc -> .html/.ts page as string
        const newArr = []
        const matches = fileDoc.match(new RegExp('(?<=Translations\\.)([^\\s|\\}\\)\\;\\,\\"]+)', 'gm'))
        matches?.forEach(x => newArr.push(x))
        return newArr
    }

    checkKeyExistance(matchingKeyArray){
        const mismatchedKeys = [];
        matchingKeyArray.forEach(key => {
            if (!this.enKeysSet?.has(key)) {
                mismatchedKeys.push(key)
            }
        })
        return mismatchedKeys;
    }

    printResults(){

        for (const languageFile of this.languageFileKeyDiffObjectArray){
            if (languageFile.missingFileKeys.length > 0 || languageFile.extraFileKeys.length > 0){
                console.log('\x1b[31m', 'Language file \x1b[1m' + languageFile.language + '\n \x1b[0m \x1b[31m is MISSING the following keys:', '\n', '\x1b[0m', languageFile.missingFileKeys)
                console.log('\x1b[31m', 'and has these keys EXTRA (compared to cs.json):', '\n', '\x1b[0m', languageFile.extraFileKeys, '\n' )
            } else {
                console.log('\x1b[34m','Language file \x1b[1m' + languageFile.language + '\x1b[0m \x1b[34m has no differences with Czech', '\x1b[0m', '\n')
            }
        }

        if (this.mismatchedKeysObjectArray.length > 0){
            for (const mismatchedFile of this.mismatchedKeysObjectArray){
                console.log(`Nonexistant keys found. Check keys \x1b[31m ${mismatchedFile.keys} \x1b[0m in folder \x1b[90m${mismatchedFile.fileName}\x1b[0m`)
            }
        } else {
            console.log('\x1b[34m', 'No mismatched keys detected in the codebase.\x1b[0m')
        }
    }

    removeSpecialUsageCases(mismatchedKeys){
        const keysToAdd = [];
        for (let key of mismatchedKeys){
            if (!(key.includes('[') && key.includes(']'))){
                keysToAdd.push(key)
            }
        }
        return (keysToAdd.length > 0 ? keysToAdd : null)
    }

    removeCommentedLines(fileDoc){

        let fileDoc2
        const commentRegex = new RegExp('(<!--[\\s\\S]*?-->)|(\\/\\*[\\s\\S]*?\\*\\/)|(\\/\\/.*(\\r\\n|\\r|\\n))', 'gm');
        fileDoc2 = fileDoc.replace(commentRegex, '')

        return fileDoc2;
    }


}

const check = new TranslateCheck()
