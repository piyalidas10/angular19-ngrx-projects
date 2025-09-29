import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './products.actions';
import { catchError, from, map, mergeMap, of } from 'rxjs';
import { ProductService } from '../services/product.service';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(({ page, pageSize }) =>
        from(this.db.fetchPage(page, pageSize)).pipe(
          map(({ items, total }) =>
            ProductActions.loadProductsSuccess({ items, total })
          ),
          catchError(error => of(ProductActions.loadProductsFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private db: ProductService) {}
}
