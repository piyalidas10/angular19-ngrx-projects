import { PartialStateUpdater } from "@ngrx/signals";
import { AppSlice } from "./app.slice";
import { Dictionary } from "../data/dictionaries";

export function changeLanguage(languages: string[]): PartialStateUpdater<AppSlice> {
    return state => {
        const index = languages.indexOf(state.selectedLanguage) ?? -1;
        const nextIndex = (index + 1) % languages.length;
        const selectedLanguage = languages[nextIndex];
        return { selectedLanguage };
    }
}

export function resetLanguages(languages: string[]): PartialStateUpdater<AppSlice> {
    return _ => ({
        possibleLanguages: languages,
        selectedLanguage: languages[0]
    })
}

export function setDictionary(dictionary: Dictionary): PartialStateUpdater<AppSlice> {
    return _ => ({ selectedDictionary: dictionary });
}
