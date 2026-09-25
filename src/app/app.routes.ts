import { Routes } from '@angular/router';
import { authGuard } from './features/auth/guards/auth.guard';
import { guestGuard } from './features/auth/guards/guest.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivateChild: [guestGuard],
    loadComponent: () =>
      import('./layouts/unauthorized-user-layout/unauthorized-user-layout.component').then(
        (m) => m.UnauthorizedUserLayoutComponent,
      ),
    
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/page/login/login.component').then((m) => m.LoginComponent),
      },
    ],
  },
  {
    path: '',
    canActivateChild: [authGuard],
    loadComponent: () =>
      import('./layouts/authorized-user-layout/authorized-user-layout.component').then(
        (m) => m.AuthorizedUserLayoutComponent,
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home-page/home-page.component').then((m) => m.HomePageComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/users/pages/users-page/users.component').then((m) => m.UsersComponent),
      },
      {
        path: 'posts',
        loadChildren: () => import('./features/posts/post.routes').then((m) => m.postRoutes),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found-page/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
];
