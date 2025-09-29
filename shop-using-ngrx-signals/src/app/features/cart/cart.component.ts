import { Component, inject } from '@angular/core';
import { CartItemComponent } from "./components/cart-item/cart-item.component";
import { SharedModule } from '../../shared.module';
import { CartStore } from './store/cart.store';

@Component({
  selector: 'app-cart',
  imports: [SharedModule, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss', 
  providers: [CartStore]
})
export class CartComponent {
  readonly store = inject(CartStore);

}
