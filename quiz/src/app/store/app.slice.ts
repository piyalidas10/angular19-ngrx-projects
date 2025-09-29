import { Dictionary } from "../data/dictionaries";

export interface AppSlice {
    readonly selectedLanguage: string;
    readonly possibleLanguages: string[];

    readonly selectedDictionary: Dictionary | null;
}

export const initialAppSlice: AppSlice = {
    selectedLanguage: '', 
    possibleLanguages: [], 
    selectedDictionary: null,
}