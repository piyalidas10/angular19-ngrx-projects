import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { ProductsEffects } from './products.effects';
import * as ProductActions from './products.actions';
import { ProductService } from '../services/product.service';

describe('ProductsEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductsEffects;
  let dbSpy: any;

  beforeEach(() => {
    dbSpy = { fetchPageAsync: jasmine.createSpy('fetchPageAsync').and.returnValue(Promise.resolve({ items: [{id:1,name:'A'}], total:1 })) };

    TestBed.configureTestingModule({
      providers: [
        ProductsEffects,
        provideMockActions(() => actions$),
        { provide: ProductService, useValue: dbSpy }
      ]
    });

    effects = TestBed.inject(ProductsEffects);
  });

  it('should dispatch loadProductsSuccess on success', (done) => {
    actions$ = of(ProductActions.loadProducts({ page:1, pageSize:5 }));
    effects.loadProducts$.subscribe(action => {
      expect(action.type).toBe('[Products] Load Products Success');
      done();
    });
  });
});
