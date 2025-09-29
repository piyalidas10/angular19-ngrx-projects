import { ENGLISH_DICTIONARY, SPANISH_DICTIONARY } from "../data/dictionaries";

export function translate(key: string, language: string): string {
    if (language.toLowerCase() === 'sp')
        return SPANISH_DICTIONARY[key]
    else
        return ENGLISH_DICTIONARY[key];
}