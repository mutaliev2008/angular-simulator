import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivateChild: [guestGuard],
    loadComponent: () =>
      import('./layouts/unauthorized-user-layout/unauthorized-user-layout.component').then(
        (m) => m.UnauthorizedUserLayoutComponent
      ),

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login.component').then((m) => m.LoginComponent)
      }
    ]
  },
  {
    path: '',
    canActivateChild: [authGuard],
    loadComponent: () =>
      import('./layouts/authorized-user-layout/authorized-user-layout.component').then(
        (m) => m.AuthorizedUserLayoutComponent
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home-page/home-page.component').then((m) => m.HomePageComponent)
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/users/pages/user-list/users.component').then((m) => m.UsersComponent)
      },
      {
        path: 'posts',
        canActivate: [adminGuard],
        loadChildren: () => import('./features/posts/post.routes').then((m) => m.postRoutes)
      },
      {
        path: 'products',
        canActivate: [adminGuard],
        loadChildren: () => import('./features/products/product.routes').then((m) => m.productRoutes)
      },
      {
        path: 'recipes',
        loadComponent: () => import('./features/recipes/page/recipe-list/recipe-list.component').then((m) => m.RecipeListComponent)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent
      )
  }
];
