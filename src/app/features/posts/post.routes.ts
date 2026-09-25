import { Routes } from '@angular/router';
import { postResolver } from './resolvers/post.resolver';

export const postRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/posts/posts.component').then((m) => m.PostsComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/post-create/post-create.component').then((m) => m.PostCreateComponent), 
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/post-detail/post-detail.component').then((m) => m.PostDetailComponent), 
    resolve: {
      post: postResolver
    }
  },
];
