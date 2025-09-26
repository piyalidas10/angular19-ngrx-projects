import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CatnavigationComponent } from './catnavigation/catnavigation.component';
import { CategoryService } from './services/category/category.service';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { ProductsStoreItem } from './services/product/products.storeItem';
import { ProductsService } from './services/product/products.service';
import { SearchKeyword } from './types/searchKeyword.type';
import { RouterOutlet } from '@angular/router';
import { CartStoreItem } from './services/cart/cart.storeItem';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from './services/user/user.service';
import { OrderService } from './services/order/order.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, CatnavigationComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [
    CategoryService,
    CategoriesStoreItem,
    ProductsStoreItem,
    ProductsService,
    CartStoreItem,
    UserService,
    OrderService,
  ],
})
export class HomeComponent {
  constructor(
    private categoriesStoreItem: CategoriesStoreItem,
    private productsStoreItem: ProductsStoreItem,
    public router: Router
  ) {
    this.categoriesStoreItem.loadCategories();
    this.productsStoreItem.loadProducts();

    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if ((event as NavigationEnd).url === '/home') {
          router.navigate(['/home/products']);
        }
      });
  }

  onSelectCategory(mainCategoryId: number): void {
    this.productsStoreItem.loadProducts({ maincategoryid: mainCategoryId });
  }
  onSearchKeyword(searchKeyword: SearchKeyword): void {
    this.productsStoreItem.loadProducts({
      maincategoryid: searchKeyword.categoryId,
      keyword: searchKeyword.keyword,
    });
  }
}
