import { signalStore, withComputed, withMethods, withProps, withState } from "@ngrx/signals";
import { initialProductListSlice } from "./product-list.slice";
import { computed, inject } from "@angular/core";
import { buildProductListVm } from "./product-list.vm-builder";
import { ShopStore } from "../../../store/shop.store";
import { addToCart, viewCart } from "../../../store/shop.updaters";

export const ProductListStore = signalStore(
    withState(initialProductListSlice), 
    withProps(_ => ({
        _shopStore: inject(ShopStore)
    })),
    withMethods(store => ({
        addToCart: store._shopStore.addToCart, 
        viewCart: store._shopStore.viewCart
    })),
    withComputed(store => ({
        vm: computed(() => buildProductListVm(
            store._shopStore.products(),
            store._shopStore.searchWord(),
            store._shopStore.cartQuantities()
        ))
    }))
)