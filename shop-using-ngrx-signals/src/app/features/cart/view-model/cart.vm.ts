import { CartItemVm } from "./cart-item.vm";

export interface CartVm {
    readonly items: CartItemVm[];
    readonly subtotal: number;
    readonly tax: number;
    readonly total: number;
    readonly itemsCount: number;
    readonly isActive: boolean;
    readonly isVisible: boolean;
    readonly canCheckout: boolean;

}