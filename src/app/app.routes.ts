import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';
import { UsersComponent } from './features/users/pages/users-page/users.component';
import { NotFoundPageComponent } from './features/not-found-page/not-found-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'users', component: UsersComponent },
    { path: '**', component: NotFoundPageComponent }
];
