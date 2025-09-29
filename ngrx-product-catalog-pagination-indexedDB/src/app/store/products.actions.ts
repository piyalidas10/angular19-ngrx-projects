import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction(
  '[Products] Load Products',
  props<{ page: number; pageSize: number }>()
);

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ items: any[]; total: number }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: any }>()
);
