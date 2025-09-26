import { Component, effect, output, signal, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSearch,
  faUserCircle,
  faShoppingCart,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { CategoriesStoreItem } from '../services/category/categories.storeItem';
import { SearchKeyword } from '../types/searchKeyword.type';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { CartStoreItem } from '../services/cart/cart.storeItem';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  faSearch = faSearch;
  faUserCircle = faUserCircle;
  faShoppingCart = faShoppingCart;
  faChevronDown = faChevronDown;

  dropdownVisible = signal(false);
  toggleDropdown = () => this.dropdownVisible.update((val) => !val);

  readonly searchClicked = output<SearchKeyword>();
  displaySearch = signal(true);

  userName = signal('');

  private router = inject(Router);
  private userService = inject(UserService);
  public categoryStore = inject(CategoriesStoreItem);
  public cart = inject(CartStoreItem);

  constructor() {
    this.displaySearch.set(this.router.url.startsWith('/home/products'));

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.displaySearch.set(event.url.startsWith('/home/products'));
      });

    // Update the userName signal whenever loggedInUser changes
    effect(() => {
      if (this.userService.loggedInUserInfo()) {
        this.userName.set(this.userService.loggedInUserInfo().firstName);
      } else {
        this.userName.set('');
      }
    });
  }

  onClickSearch(keyword: string, categoryId: string): void {
    this.searchClicked.emit({
      categoryId: parseInt(categoryId),
      keyword: keyword,
    });
  }

  navigateToCart(): void {
    this.router.navigate(['home/cart']);
  }

  pastOrders(): void {
    this.dropdownVisible.set(false);
    this.router.navigate(['home/pastorders']);
  }

  logout(): void {
    this.dropdownVisible.set(false);
    this.userService.logout();
  }

  isUserAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }
}
