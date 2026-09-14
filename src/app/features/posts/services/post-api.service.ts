import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPostResponse } from '../interface/IPostResponce';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  private http: HttpClient = inject(HttpClient);

  getPosts(skip: number, limit: number): Observable<IPostResponse> {
    return this.http.get<IPostResponse>(`https://dummyjson.com/posts?limit=${ limit }&skip=${ skip }`)
  }

}
