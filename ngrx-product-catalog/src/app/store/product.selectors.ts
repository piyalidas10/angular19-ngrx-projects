
import { createSelector } from '@ngrx/store';
import { selectAll } from './product.reducer';
import { ProductState } from './product.reducer';

export const selectProductsState = (state: any) => state.products as ProductState;

export const selectAllProducts = createSelector(selectProductsState, selectAll);

export const selectPagedProducts = createSelector(
  selectProductsState,
  (s: ProductState) => {
    const start = (s.page - 1) * s.pageSize;
    const all = selectAll(s as any);
    return all.slice(start, start + s.pageSize);
  }
);

export const selectTotalProducts = createSelector(selectProductsState, (s: ProductState) => s.total);
export const selectLoading = createSelector(selectProductsState, (s: ProductState) => s.loading);
