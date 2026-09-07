import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';

export const routes: Routes = [    
    { path: 'users', loadComponent: () => import('./features/users/pages/users-page/users.component').then(m => m.UsersComponent) },
    { path: '', loadComponent: () => import('./features/home-page/home-page.component').then(m => m.HomePageComponent) },
    { path: '**', loadComponent: () => import('./features/not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent) }
];
