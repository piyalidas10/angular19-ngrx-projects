import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './products.actions';

export interface ProductsState {
  items: any[];
  total: number;
  loading: boolean;
}

export const initialState: ProductsState = {
  items: [],
  total: 0,
  loading: false
};

export const productsReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, state => ({ ...state, loading: true })),
  on(ProductActions.loadProductsSuccess, (state, { items, total }) => ({
    ...state, items, total, loading: false
  })),
  on(ProductActions.loadProductsFailure, state => ({ ...state, loading: false }))
);
