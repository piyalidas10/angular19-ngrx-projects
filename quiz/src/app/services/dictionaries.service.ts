import { Inject, inject, Injectable } from "@angular/core";
import { DICTIONARIES_TOKEN } from "../tokens/dictionaries.token";
import { getDictionary } from "../store/app.helpers";
import { delay, Observable, of, switchMap, tap, throwError } from "rxjs";
import { Dictionary } from "../data/dictionaries";

@Injectable({providedIn: 'root'})
export class DictionariesService {
    readonly #dictionaries = inject(DICTIONARIES_TOKEN);
    readonly #delays = [1000, 5000, 'error'];
    #currentDelayIndex = -1;

    readonly languages = Object.keys(this.#dictionaries);

    private dictionaryOf(language: string) {
        return getDictionary(language, this.#dictionaries);
    }

    private nextDelay() {
        this.#currentDelayIndex = (this.#currentDelayIndex + 1) % this.#delays.length;
        return this.#delays[this.#currentDelayIndex];
    }

    getDictionaryWithDelay(language: string): Observable<Dictionary> {
        const d = this.nextDelay();

        if (typeof d === 'string') {
            return of(1).pipe(
                delay(1000), 
                switchMap(_ => throwError(() => 'Error loading dictionary'))
            )
        } else {
            return of(this.dictionaryOf(language)).pipe(
                tap(_ => console.log(`Started loading for ${language}`)),
                delay(d),
                tap(_ => console.log(`Finished loading for ${language}`)),
            );    
        }
        

    }
}