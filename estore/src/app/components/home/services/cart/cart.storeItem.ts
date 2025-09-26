import { signal, computed, effect } from '@angular/core';
import { CartItem } from '../../types/cart.type';
import { Product } from '../../types/products.type';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
}

export class CartStoreItem {
  private readonly _initialized = signal(false);
  private readonly _products = signal<CartItem[]>([]);

  constructor() {
    if (isBrowser()) {
      const loaded = this.loadFromSession();
      this._products.set(loaded);
    }
    this._initialized.set(true);

    // Only run this effect once initialized
    effect(() => {
      if (!this._initialized() || !isBrowser()) return;

      const products = this._products();
      try {
        if (products.length === 0) {
          sessionStorage.removeItem('cart');
        } else {
          sessionStorage.setItem('cart', JSON.stringify(products));
        }
      } catch (error) {
        console.error('Failed to sync cart to sessionStorage:', error);
      }
    });
  }

  readonly initialized = computed(() => this._initialized());

  readonly totalAmount = computed(() =>
    this._products().reduce((sum, item) => sum + item.amount, 0)
  );

  readonly totalProducts = computed(() =>
    this._products().reduce((count, item) => count + item.quantity, 0)
  );

  readonly cart = computed(() => ({
    products: this._products(),
    totalAmount: this.totalAmount(),
    totalProducts: this.totalProducts(),
  }));

  addProduct(product: Product): void {
    const current = this._products();
    const index = current.findIndex((i) => i.product.id === product.id);

    if (index === -1) {
      this._products.set([
        ...current,
        { product, quantity: 1, amount: Number(product.price) },
      ]);
    } else {
      const updated = [...current];
      const item = updated[index];
      updated[index] = {
        ...item,
        quantity: item.quantity + 1,
        amount: item.amount + Number(product.price),
      };
      this._products.set(updated);
    }
  }

  decreaseProductQuantity(cartItem: CartItem): void {
    const updated = this._products()
      .map((item) => {
        if (item.product.id === cartItem.product.id) {
          if (item.quantity <= 1) return null;
          return {
            ...item,
            quantity: item.quantity - 1,
            amount: item.amount - Number(item.product.price),
          };
        }
        return item;
      })
      .filter(Boolean) as CartItem[];

    this._products.set(updated);
  }

  removeProduct(cartItem: CartItem): void {
    const updated = this._products().filter(
      (item) => item.product.id !== cartItem.product.id
    );
    this._products.set(updated);
  }

  private loadFromSession(): CartItem[] {
    const raw = sessionStorage.getItem('cart');
    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
      return [];
    } catch {
      console.warn('Invalid session storage cart format.');
      return [];
    }
  }
  clearCart(): void { //updated
    sessionStorage.removeItem('cart');
    this._products.set([]);
  }
}
