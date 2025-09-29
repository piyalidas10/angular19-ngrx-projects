import { Component, computed, inject, input } from '@angular/core';
import { CartItemVm } from '../../view-model/cart-item.vm';
import { QuantityComponent } from '../quantity/quantity.component';
import { SharedModule } from '../../../../shared.module';
import { CartStore } from '../../store/cart.store';

@Component({
  selector: 'app-cart-item',
  imports: [SharedModule, QuantityComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  readonly store = inject(CartStore);
  readonly item = input.required<CartItemVm>();
  readonly image = computed(() => `images/${this.item().id}.png`);

}
