import { Component, inject, signal } from '@angular/core';
import { RatingsComponent } from '../../ratings/ratings.component';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/product/products.service';
import { Product } from '../types/products.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { CartStoreItem } from '../services/cart/cart.storeItem';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-product-details',
  imports: [RatingsComponent, CommonModule, FontAwesomeModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cart = inject(CartStoreItem);

  readonly product = signal<Product | null>(null);
  faShoppingCart = faShoppingCart;

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id !== null && !isNaN(id)) {
      this.productsService
        .getProduct(id)
        .pipe(takeUntilDestroyed())
        .subscribe((res) => {
          this.product.set(Array.isArray(res) ? res[0] : res);
        });
      return;
    }
  }
  addToCart() {
    const product = this.product();
    if (product) {
      this.cart.addProduct(product);
    }
  }
}
