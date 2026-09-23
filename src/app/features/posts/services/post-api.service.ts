import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IPostResponse } from '../interface/IPostResponce';
import { Observable } from 'rxjs';
import { IPost } from '../interface/IPost';
import { API_URL } from '../../../core/constants/api.constants';


@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = `${ API_URL }/posts`;

  getApiPosts(skip: number, limit: number): Observable<IPostResponse> {
    return this.http.get<IPostResponse>(`${ this.apiUrl }?limit=${ limit }&skip=${ skip }`);
  }

  getApiPostById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${ this.apiUrl }/${ id }`);
  }

  deleteApiPost(id: number): Observable<IPost> {
    return this.http.delete<IPost>(`${ this.apiUrl }/${ id }`);
  }

  updateApiPost(id: number, postData: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${ this.apiUrl }/${ id }`, postData);
  }

  createApiPost(postData: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${ this.apiUrl }/add`, postData);
  }

}
