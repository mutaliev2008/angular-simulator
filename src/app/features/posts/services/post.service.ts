import { inject, Injectable } from '@angular/core';
import { PostApiService } from './post-api.service';
import { IPostResponse } from '../interface/IPostResponce';
import { BehaviorSubject, catchError, finalize, Observable, of, tap, throwError } from 'rxjs';
import { IPost } from '../interface/IPost';
import { LoaderService } from '../../../../services/loader.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../../../../services/message.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  postApiService: PostApiService = inject(PostApiService);
  loadService: LoaderService = inject(LoaderService);
  messageService: MessageService = inject(MessageService);

  private postResponseSubject: BehaviorSubject<IPostResponse> = new BehaviorSubject<IPostResponse>({
    posts: [],
    total: 0,
    skip: 0,
    limit: 10,
  });
  postResponse$: Observable<IPostResponse> = this.postResponseSubject.asObservable();

  postSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  posts$: Observable<IPost[]> = this.postSubject.asObservable();

  loadPosts(skip: number, limit: number): Observable<IPostResponse> {
    this.loadService.showLoader();

    return this.postApiService.getApiPosts(skip, limit).pipe(
      tap((posts: IPostResponse) => {
        this.setPosts(posts);
      }),
      catchError((error: HttpErrorResponse) => {
        this.messageService.showError(error.message);
        return throwError(() => error);
      }),
      finalize(() => {
        this.loadService.hideLoader();
      }),
    );
  }

  getPostById(id: number): Observable<IPost> {
    this.loadService.showLoader();

    return this.postApiService.getApiPostById(id).pipe(
      catchError((error: HttpErrorResponse) => {
        this.messageService.showError(error.message);
        return throwError(() => error);
      }),
      finalize(() => {
        this.loadService.hideLoader();
      }),
    );
  }

  updatePost(id: number, post: IPost): Observable<IPost> {
    this.loadService.showLoader();

    return this.postApiService.updateApiPost(id, post).pipe(
      tap((updatedPost: IPost) => {
        const updatedPosts: IPost[] = this.postResponseSubject.value.posts.map((p: IPost) =>
          p.id === updatedPost.id ? updatedPost : p,
        );

        this.setPosts({
          ...this.postResponseSubject.value,
          posts: updatedPosts,
        });
      }),
      catchError((error: HttpErrorResponse) => {
        this.messageService.showError(error.message);
        return throwError(() => error);
      }),
      finalize(() => {
        this.loadService.hideLoader();
      }),
    );
  }

  createPost(postData: IPost): Observable<IPost> {
    this.loadService.showLoader();

    return this.postApiService.createApiPost(postData).pipe(
      tap((newPost: IPost) => {
        const updatedPosts: IPost[] = [newPost, ...this.postResponseSubject.value.posts];
        this.setPosts({
          ...this.postResponseSubject.value,
          posts: updatedPosts,
        });
      }),
      catchError((error: HttpErrorResponse) => {
        this.messageService.showError(error.message);
        return throwError(() => error);
      }),
      finalize(() => {
        this.loadService.hideLoader();
      }),
    );
  }

  deletePost(id: number): Observable<IPost> {
    this.loadService.showLoader();

    return this.postApiService.deleteApiPost(id).pipe(
      tap((deletedPost: IPost) => {
        const updatedPosts: IPost[] = this.postResponseSubject.value.posts.filter(
          (post: IPost) => post.id !== deletedPost.id,
        );
        this.setPosts({
          ...this.postResponseSubject.value,
          posts: updatedPosts,
        });
      }),
      catchError((error: HttpErrorResponse) => {
        this.messageService.showError(error.message);
        return throwError(() => error);
      }),
      finalize(() => {
        this.loadService.hideLoader();
      }),
    );
  }

  private setPosts(posts: IPostResponse): void {
    this.postResponseSubject.next(posts);
  }

}
