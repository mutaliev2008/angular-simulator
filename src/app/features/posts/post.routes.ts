import { Routes } from "@angular/router";

export const postRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/posts/posts.component').then(m => m.PostsComponent) },
]