
import { productReducer, initialState, adapter } from './product.reducer';
import * as ProductActions from './product.actions';

describe('Product Reducer', () => {
  it('should set loading on loadProducts', () => {
    const action = ProductActions.loadProducts({ page: 2, pageSize: 5 });
    const state = productReducer(initialState, action);
    expect(state.loading).toBeTrue();
    expect(state.page).toBe(2);
    expect(state.pageSize).toBe(5);
  });

  it('should set products on loadProductsSuccess', () => {
    const products = [{ id: 1, name: 'A', price: 10 }];
    const action = ProductActions.loadProductsSuccess({ products: products as any, total: 1 });
    const state = productReducer(initialState, action);
    const all = adapter.getSelectors().selectAll(state as any);
    expect(all.length).toBe(1);
    expect(state.total).toBe(1);
    expect(state.loading).toBeFalse();
  });
});
