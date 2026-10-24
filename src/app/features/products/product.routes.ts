import { Routes } from '@angular/router';
import { productResolver } from './resolvers/product.resolver';

export const productRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./page/products/products.component').then((m) => m.ProductsComponent)
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('../cart/page/cart/cart.component').then((m) => m.CartComponent)
  },
  {
    path: ':id',
    loadComponent: () => 
      import('./page/product-detail/product-detail.component').then((m) => m.ProductDetailComponent),
    resolve: {
      product: productResolver
    }
  }
];
