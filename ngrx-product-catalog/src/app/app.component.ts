
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from './models/product.model';
import * as ProductActions from './store/product.actions';
import { selectPagedProducts, selectTotalProducts, selectLoading } from './store/product.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products$: Observable<Product[]>;
  total$: Observable<number>;
  loading$: Observable<boolean>;
  page = 1;
  pageSize = 6;

  constructor(private store: Store) {
    this.products$ = this.store.select(selectPagedProducts);
    this.total$ = this.store.select(selectTotalProducts);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    this.loadPage(1);
  }

  loadPage(page: number) {
    if (page < 1) return;
    this.page = page;
    this.store.dispatch(ProductActions.loadProducts({ page, pageSize: this.pageSize }));
  }
}
