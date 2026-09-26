import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { PostService } from '../services/post.service';
import { IPost } from '../interface/IPost';
import { MessageService } from '../../../../services/message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const postResolver: ResolveFn<IPost> = (route) => {
  const postService: PostService= inject(PostService);
  const postId: string = route.paramMap.get('id')!;
  const messageService: MessageService = inject(MessageService); 

  return postService.getPostById(Number(postId)).pipe(
    catchError((error: HttpErrorResponse) => {
      messageService.showError(error.error.message);
      return throwError(() => error);
    })
  );
};
