import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartStoreItem } from '../cart/cart.storeItem';
import {
  Order,
  OrderItem,
  PastOrder,
  PastOrderProduct,
} from '../../types/order.type';
import { DeliveryAddress } from '../../types/cart.type';
import { UserService } from '../user/user.service';

@Injectable()
export class OrderService {
  constructor(
    private httpClient: HttpClient,
    private cartStore: CartStoreItem,
    private userService: UserService
  ) {}

  saveOrder(
    deliveryAddress: DeliveryAddress,
    userEmail: string
  ): Observable<any> {
    const url = 'http://localhost:5001/orders/add';
    const orderDetails: OrderItem[] = [];
    this.cartStore.cart().products.forEach((product) => {
      const orderItem: OrderItem = {
        productId: product.product.id,
        price: product.product.price,
        qty: product.quantity,
        amount: product.amount,
      };
      orderDetails.push(orderItem);
    });

    const order: Order = {
      userName: deliveryAddress.userName,
      address: deliveryAddress.address,
      city: deliveryAddress.city,
      state: deliveryAddress.state,
      pin: deliveryAddress.pin,
      total: this.cartStore.cart().totalAmount,
      userEmail: userEmail,
      orderDetails: orderDetails,
    };

    console.log('OrderService - Data to be sent:', order);

    let headers: HttpHeaders;
    const authToken = this.userService.authToken();
    if (authToken) {
      headers = new HttpHeaders({ authorization: authToken });
    } else {
      headers = new HttpHeaders();
    }
    return this.httpClient.post(url, order, { headers });
  }

  getOrders(userEmail: string): Observable<PastOrder[]> {
    const url = '/assets/mockdata/pastorders.json';
    // const url = `http://localhost:5001/orders/allorders?userEmail=${userEmail}`;
    let headers: HttpHeaders;
    const authToken = this.userService.authToken();
    if (authToken) {
      headers = new HttpHeaders({ authorization: authToken });
    } else {
      headers = new HttpHeaders();
    }
    return this.httpClient.get<PastOrder[]>(url, { headers });
  }

  getOrderProducts(orderId: number): Observable<PastOrderProduct[]> {
    const url = '/assets/mockdata/pastorderproducts.json';
    // const url = `http://localhost:5001/orders/orderproducts?orderId=${orderId}`;
    let headers: HttpHeaders;
    const authToken = this.userService.authToken();
    if (authToken) {
      headers = new HttpHeaders({ authorization: authToken });
    } else {
      headers = new HttpHeaders();
    }
    return this.httpClient.get<PastOrderProduct[]>(url, { headers });
  }
}
