import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../../types/cart.type';
import { Observable } from 'rxjs';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripePromise: Promise<Stripe | null>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.stripePromise = loadStripe(environment.stripePublicKey);
  }

  async redirectToCheckout(cartItems: CartItem[]): Promise<string | void> {
    const stripe = await this.stripePromise;

    if (!stripe) {
      console.error('Stripe SDK failed to load.');
      return;
    }
    this.createCheckoutSession(cartItems).subscribe({
      next: (session: { id: string }) => {
        stripe.redirectToCheckout({ sessionId: session.id }).then((result) => {
          if (result?.error) {
            console.error('Stripe redirection error: ', result.error.message);
          }
        });
      },
      error: (error) => {
        console.error('Error creating checkout session: ', error);
        this.router.navigate(['/home/cart'], {
          queryParams: { status: 'checkout_error', message: error.message },
        });
      },
    });
  }

  private createCheckoutSession(
    cartItems: CartItem[]
  ): Observable<{ id: string }> {
    const url = 'http://localhost:5001/checkout/create-checkout-session';

    const body = {
      cartItems: cartItems.map((item) => ({
        name: item.product.product_name,
        price: item.product.price,
        quantity: item.quantity,
      })),
    };
    return this.httpClient.post<{ id: string }>(url, body);
  }
}
