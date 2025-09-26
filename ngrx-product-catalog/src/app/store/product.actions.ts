
import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const loadProducts = createAction('[Products] Load Products', props<{ page: number, pageSize: number }>());
export const loadProductsSuccess = createAction('[Products] Load Success', props<{ products: Product[], total: number }>());
export const loadProductsFailure = createAction('[Products] Load Failure', props<{ error: any }>());
