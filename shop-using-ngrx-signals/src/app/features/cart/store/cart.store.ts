import { signalStore, withComputed, withMethods, withProps, withState } from "@ngrx/signals";
import { initialCartSlice } from "./cart.slice";
import { ShopStore } from "../../../store/shop.store";
import { computed, inject } from "@angular/core";
import { buildCartVm } from "./cart.vm-builder";

export const CartStore = signalStore(
    withState(initialCartSlice), 
    withProps(_ => ({
        _shopStore: inject(ShopStore)
    })), 
    withMethods(store => ({
        incrementQuantity: store._shopStore.incrementQuantity, 
        decrementQuantity: store._shopStore.decrementQuantity, 
        checkoutCart: store._shopStore.checkoutCart
    })),
    withComputed(store => ({
        vm: computed(() => buildCartVm(
            store._shopStore.products(), 
            store._shopStore.cartQuantities(), 
            store.taxRate(), 
            store._shopStore.cartVisible()
        ))
    }))
)