import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { initialAppSlice } from './app.slice';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  changeLanguage,
  resetLanguages,
  setDictionary,
} from './app.updaters';
import { DictionariesService } from '../services/dictionaries.service';
import { switchMap, tap } from 'rxjs';
import { NotificationsService } from '../services/notifications.service';
import { withBusy } from '../custom-features/with-busy/with-busy.feature';
import { setBusy, setIdle } from '../custom-features/with-busy/with-busy.updaters';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialAppSlice),
  withBusy(),
  withProps((_) => {
    const _dictionariesService = inject(DictionariesService);
    const _languages = _dictionariesService.languages;

    return {
      _dictionariesService,
      _languages,
      _notifications: inject(NotificationsService),
    };
  }),
  withMethods((store) => {
    const _invalidateDictionary = rxMethod<string>(input$ => input$.pipe(
        tap(_ => patchState(store, setBusy())),
        switchMap(lang => store._dictionariesService
            .getDictionaryWithDelay(lang).pipe(
              tapResponse({
                next: dict => patchState(store, setDictionary(dict)), 
                error: err => store._notifications.error(`${err}`),
                finalize: () => patchState(store, setIdle())
              })      
            ))
      ));

    _invalidateDictionary(store.selectedLanguage);

    return {
      changeLanguage: () => patchState(store, changeLanguage(store._languages)),
      _resetLanguages: () => patchState(store, resetLanguages(store._languages))
    };
  }),
  withHooks((store) => ({
    onInit: () => {
      store._resetLanguages();
    },
  })), 
  withDevtools('app-store')
);
