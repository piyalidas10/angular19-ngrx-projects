import { ApplicationConfig, inject, isDevMode, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { productsReducer } from './store/products.reducer';
import { ProductsEffects } from './store/products.effects';
import { ProductService } from './services/product.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter([]),
    ProductService,
    provideClientHydration(withEventReplay()),
    provideStore({ products: productsReducer }),
    provideEffects([ProductsEffects]),
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
