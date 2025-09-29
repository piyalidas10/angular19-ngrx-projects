import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import * as ProductActions from '../store/products.actions';
import { selectProducts, selectTotal } from '../store/products.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [CommonModule]
})
export class ProductListComponent implements OnInit {
  products$ = this.store.select(selectProducts);
  total$ = this.store.select(selectTotal);
  page = 1;
  pageSize = 5;

  constructor(private store: Store) {
    this.loadPage(1);
  }

  ngOnInit() {
    this.loadPage(1);
  }

  loadPage(page: number) {
    this.page = page;
    this.store.dispatch(ProductActions.loadProducts({ page, pageSize: this.pageSize }));
  }

  prevPage() {
    if (this.page > 1) this.loadPage(this.page - 1);
  }

  nextPage() {
    this.loadPage(this.page + 1);
  }
}
