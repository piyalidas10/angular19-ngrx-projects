
import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as ProductActions from './product.actions';
import { Product } from '../models/product.model';

export interface ProductState extends EntityState<Product> {
  total: number;
  page: number;
  pageSize: number;
  loading: boolean;
  error?: any;
}

export const adapter = createEntityAdapter<Product>();

export const initialState: ProductState = adapter.getInitialState({
  total: 0,
  page: 1,
  pageSize: 6,
  loading: false,
  error: null
});

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (s, { page, pageSize }) => ({ ...s, loading: true, page, pageSize })),
  on(ProductActions.loadProductsSuccess, (s, { products, total }) => {
    return adapter.setAll(products, { ...s, total, loading: false });
  }),
  on(ProductActions.loadProductsFailure, (s, { error }) => ({ ...s, loading: false, error }))
);

export const { selectAll, selectEntities } = adapter.getSelectors();
