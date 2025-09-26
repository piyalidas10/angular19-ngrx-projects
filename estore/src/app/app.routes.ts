import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductsGalleryComponent } from './components/home/products-gallery/products-gallery.component';
import { ProductDetailsComponent } from './components/home/product-details/product-details.component';
import { CartComponent } from './components/home/cart/cart.component';
import { UserSignupComponent } from './components/home/user/user-signup/user-signup.component';
import { UserLoginComponent } from './components/home/user/user-login/user-login.component';
import { PastOrdersComponent } from './components/home/past-orders/past-orders.component';
import { authGuard } from './components/home/services/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((c) => c.HomeComponent),
    children: [
      {
        path: 'products',
        component: ProductsGalleryComponent,
      },
      {
        path: 'product/:id',
        component: ProductDetailsComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'signup',
        component: UserSignupComponent,
      },
      {
        path: 'login',
        component: UserLoginComponent,
      },
      {
        path: 'pastorders',
        component: PastOrdersComponent,
        canActivate: [authGuard],
      },
    ],
  },
  { path: '', redirectTo: '/home/products', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
