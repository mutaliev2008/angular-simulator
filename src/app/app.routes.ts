import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';
import { UsersPageComponent } from './features/users-page/users-page.component';
import { NotFoundPageComponent } from './features/not-found-page/not-found-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'users', component: UsersPageComponent },
    { path: '**', component: NotFoundPageComponent }
];
