import { Component, computed, effect, inject, signal } from '@angular/core';
import { PastOrder, PastOrderProduct } from '../types/order.type';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order/order.service';
import { UserService } from '../services/user/user.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-past-orders',
  imports: [CommonModule],
  templateUrl: './past-orders.component.html',
  styleUrl: './past-orders.component.css',
})
export class PastOrdersComponent {
  private orderService = inject(OrderService);
  private userService = inject(UserService);

  selectedOrderId = signal<number | null>(null);
  readonly pastOrderProducts = signal<PastOrderProduct[]>([]);

  // fetch past orders using toSignal
  readonly pastOrders = toSignal(
    this.orderService.getOrders(this.userService.loggedInUserInfo().email),
    { initialValue: [] as PastOrder[] }
  );

  // selected past order
  readonly pastOrder = computed(() => {
    const order = this.pastOrders().find(
      (o) => o.orderId === this.selectedOrderId()
    );
    if (order) {
      return order;
    }
    // If no order is selected, return an object with user info from userService
    return {
      orderId: 0, // Or some default value
      userName:
        this.userService.loggedInUserInfo().firstName +
        ' ' +
        this.userService.loggedInUserInfo().lastName,
      address: this.userService.loggedInUserInfo().address,
      city: this.userService.loggedInUserInfo().city,
      state: this.userService.loggedInUserInfo().state,
      pin: this.userService.loggedInUserInfo().pin,
      total: 0, // Or some default value
      orderDate: '', // Or some default value
    };
  });

  constructor() {
    effect(() => {
      const id = this.selectedOrderId();
      if (id) {
        this.orderService.getOrderProducts(id).subscribe((products) => {
          this.pastOrderProducts.set(products);
        });
      } else {
        this.pastOrderProducts.set([]);
      }
    });
  }

  selectOrder(event: Event): void {
    const value = Number.parseInt((event.target as HTMLSelectElement).value);
    this.selectedOrderId.set(value > 0 ? value : null);
  }
}
