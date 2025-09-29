import { CartQuantities } from "../models/cart-quantities.model";
import { ShopVm } from "./shop.vm";

export function buildShopVm(
    cartVisible: boolean, 
    cartQuantities: CartQuantities
): ShopVm {
    const itemsCount = Object.entries(cartQuantities).length;

    return {
        isCartActive: itemsCount > 0,
        isCartVisible: cartVisible,
        cartItemsCount: itemsCount
    }

}