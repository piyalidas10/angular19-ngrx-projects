import { Component, inject } from "@angular/core";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { ProductListStore } from "./store/product-list.store";

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss', 
  providers: [ProductListStore]
})
export class ProductListComponent {
  readonly store = inject(ProductListStore);

}
