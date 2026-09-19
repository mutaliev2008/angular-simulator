import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { PostService } from '../services/post.service';
import { IPost } from '../interface/IPost';

export const postResolver: ResolveFn<IPost> = (route, state) => {

  const postService: PostService= inject(PostService);
  const postId: string = route.paramMap.get('id')!;
  
  return postService.getPostById(Number(postId));

};
