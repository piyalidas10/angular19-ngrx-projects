
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../services/product.service';

@Injectable()
export class ProductEffects {
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(action =>
        this.productService.fetchPage(action.page, action.pageSize).pipe(
          map(res => ProductActions.loadProductsSuccess({ products: res.items, total: res.total })),
          catchError(err => of(ProductActions.loadProductsFailure({ error: err })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private productService: ProductService) {}
}
