import { Component, effect, signal, WritableSignal } from '@angular/core';
import {
  faTrash,
  faBoxOpen,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../types/cart.type';
import { Router, ActivatedRoute } from '@angular/router';
import { CartStoreItem } from '../services/cart/cart.storeItem';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule, NgClass } from '@angular/common';
import { RatingsComponent } from '../../ratings/ratings.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoggedInUser } from '../types/user.type';
import { UserService } from '../services/user/user.service';
import { OrderService } from '../services/order/order.service';
import { StripeService } from '../services/stripe/stripe.service';
import { switchMap, of, tap, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [
    FontAwesomeModule,
    CommonModule,
    RatingsComponent,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  faTrash = faTrash;
  faBoxOpen = faBoxOpen;
  faShoppingCart = faShoppingCart;

  alertType: number = 0;
  alertMessage: string = '';
  disableCheckout: boolean = false;
  paymentSuccess = signal(false);

  user = signal<LoggedInUser>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pin: '',
    email: '',
  });

  orderForm: WritableSignal<FormGroup>;

  constructor(
    public cartStore: CartStoreItem,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private orderService: OrderService,
    private stripeService: StripeService
  ) {
    this.orderForm = signal(this.createOrderForm(this.user()));

    effect(() => {
      if (this.paymentSuccess()) {
        return;
      }
      const newUser = this.user();
      this.orderForm.set(this.createOrderForm(newUser));
    });

    // Handle Stripe redirect query params
    this.route.queryParams.pipe(
      switchMap(async (params) => {
        if (params['status'] === 'success' && !this.paymentSuccess()) {
          this.paymentSuccess.set(true);

          if (typeof window !== 'undefined') {
            const storedFormData = localStorage.getItem('orderFormData');
            if (storedFormData) {
              try {
                const formData = JSON.parse(storedFormData);
                this.orderForm().patchValue(formData);
                localStorage.removeItem('orderFormData');

                const user = await firstValueFrom(
                  this.userService.loggedInUser$
                );
                if (user) {
                  this.user.set(user);
                  this.saveOrder();
                }
              } catch (error) {
                console.error('Error parsing stored form data:', error);
                this.alertType = 2;
                this.alertMessage =
                  'Failed to restore your address. Please retry.';
                return of(null);
              }
            }
          }
          return this.userService.loggedInUser$;
        } else if (params['status'] === 'cancel') {
          this.alertType = 2;
          this.alertMessage = 'Payment was cancelled.';
          return of(null);
        } else {
          return of(null);
        }
      })
    );

    this.userService.loggedInUser$.subscribe((u) => this.user.set(u));
  }

  private createOrderForm(user: LoggedInUser | null): FormGroup {
    return this.fb.group({
      name: [
        user?.firstName && user?.lastName
          ? `${user.firstName} ${user.lastName}`.trim()
          : '',
        Validators.required,
      ],
      address: [user?.address || '', Validators.required],
      city: [user?.city || '', Validators.required],
      state: [user?.state || '', Validators.required],
      pin: [user?.pin || '', Validators.required],
    });
  }

  navigateToHome(): void {
    this.router.navigate(['home/products']);
  }

  updateQuantity($event: any, cartItem: CartItem): void {
    if ($event.target.innerText === '+') {
      this.cartStore.addProduct(cartItem.product);
    } else if ($event.target.innerText === '-') {
      this.cartStore.decreaseProductQuantity(cartItem);
    }
  }

  removeItem(cartItem: CartItem): void {
    this.cartStore.removeProduct(cartItem);
  }

  checkout(): void {
    if (!this.userService.isAuthenticated()) {
      this.alertType = 2;
      this.alertMessage = 'Please log in to proceed with payment.';
      return;
    }
    if (
      this.cartStore.cart().products.length > 0 &&
      this.orderForm().valid &&
      typeof window !== 'undefined'
    ) {
      localStorage.setItem(
        'orderFormData',
        JSON.stringify(this.orderForm().value)
      );
      this.stripeService.redirectToCheckout(this.cartStore.cart().products);
    } else {
      this.alertType = 2;
      this.alertMessage = 'Please fill in the delivery address to continue.';
    }
  }

  private saveOrder(): void {
    const form = this.orderForm();
    console.log('Saving order...');

    const deliveryAddress = {
      userName: form.get('name')?.value,
      address: form.get('address')?.value,
      city: form.get('city')?.value,
      state: form.get('state')?.value,
      pin: form.get('pin')?.value,
    };

    const email = this.user()?.email;

    if (!email) {
      this.alertType = 2;
      this.alertMessage = 'Email missing. Please log in again.';
      return;
    }

    this.orderService.saveOrder(deliveryAddress, email).subscribe({
      next: () => {
        console.log('Order saved!');
        this.cartStore.clearCart();
        this.alertType = 0;
        this.alertMessage = 'Order placed successfully!';
        this.disableCheckout = true;
        this.orderForm.set(this.createOrderForm(this.user()));
      },
      error: (error) => {
        console.error('Order save error:', error);
        this.alertType = 2;
        this.alertMessage = error.error?.message || 'Order save failed.';
      },
    });
  }
}
