import { inject, Injectable } from '@angular/core';
import { PostApiService } from './post-api.service';
import { IPostResponse } from '../interface/IPostResponce';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { IPost } from '../interface/IPost';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postApiService: PostApiService = inject(PostApiService);
  private localStorage: LocalStorageService = inject(LocalStorageService);

  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  private postResponseSubject: BehaviorSubject<IPostResponse> = new BehaviorSubject<IPostResponse>({
    posts: [],
    total: 0,
    skip: 0,
    limit: 10,
  });
  postResponse$: Observable<IPostResponse> = this.postResponseSubject.asObservable();

  getPosts(skip: number, limit: number): Observable<IPostResponse> {
    const localData: IPostResponse | null = this.localStorage.getItem('posts');
    this.isLoadingSubject.next(true);

    // if (localData) {
    //   this.setPosts(localData);
    //   this.isLoadingSubject.next(false);
    // }

    return this.postApiService.getPosts(skip, limit).pipe(
      tap((posts: IPostResponse) => {        
        this.isLoadingSubject.next(false);
        this.setPosts(posts);
      }),
    );
  }

  private setPosts(posts: IPostResponse): void {
    this.localStorage.setItem('posts', posts);
    this.postResponseSubject.next(posts);
  }
}
