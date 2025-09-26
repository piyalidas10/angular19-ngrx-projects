import { Injectable, signal } from '@angular/core';
import { Product } from '../../types/products.type';
import { ProductsService } from './products.service';

@Injectable()
export class ProductsStoreItem {
  private readonly _products = signal<Product[]>([]);
  readonly products = this._products.asReadonly();

  constructor(private productsService: ProductsService) {
    this.loadProducts();
  }

  loadProducts(filters?: {
    maincategoryid?: number;
    subcategoryid?: number;
    keyword?: string;
  }): void {
    this.productsService.getAllProducts(filters).subscribe((products) => {
      this._products.set(products);
    });
  }
}
