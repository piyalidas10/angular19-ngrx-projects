
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { ProductEffects } from './product.effects';
import * as ProductActions from './product.actions';
import { ProductService } from '../services/product.service';
import { hot, cold } from 'jasmine-marbles';

describe('ProductEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductEffects;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductService', ['fetchPage']);
    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        provideMockActions(() => actions$),
        { provide: ProductService, useValue: spy }
      ]
    });
    effects = TestBed.inject(ProductEffects);
    productService = TestBed.inject(ProductService) as any;
  });

  it('should dispatch loadProductsSuccess on success', () => {
    const action = ProductActions.loadProducts({ page: 1, pageSize: 5 });
    const products = [{ id: 1, name: 'A', price: 10 }];
    productService.fetchPage.and.returnValue(of({ items: products, total: 1 }));
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: ProductActions.loadProductsSuccess({ products: products as any, total: 1 }) });
    expect(effects.load$).toBeObservable(expected);
  });

  it('should dispatch loadProductsFailure on error', () => {
    const action = ProductActions.loadProducts({ page: 1, pageSize: 5 });
    productService.fetchPage.and.returnValue(throwError(() => new Error('fail')));
    actions$ = hot('-a', { a: action });
    const expected = cold('-b', { b: ProductActions.loadProductsFailure({ error: new Error('fail') }) });
    expect(effects.load$).toBeObservable(expected);
  });
});
