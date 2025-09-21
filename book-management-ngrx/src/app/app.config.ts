import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { BookReducer } from './books/book.reducer';
import { provideEffects } from '@ngrx/effects';
import { BookEffects } from './books/book.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideStore({ book: BookReducer }),
    provideEffects([BookEffects]),
    provideStoreDevtools({
          maxAge: 25, // Retains last 25 states
          logOnly: !isDevMode(), // Restrict extension to log-only mode in production
          autoPause: true, // Pauses recording actions and state changes when the extension window is not open
          trace: false, // If set to true, it will add stack traces to the actions in the devtools
          traceLimit: 75, // The maximum number of stack trace frames to be stored
          connectInZone: true, // Whether to connect the DevTools in the Angular zone
        }),
  ]
};
