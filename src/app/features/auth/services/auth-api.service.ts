import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthResponse, IToken, IUser } from '../interface/IAuth';
import { ICredentials } from '../interface/ICredentials ';
import { API_URL } from '../../../core/tokens/api.token';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  
  private http: HttpClient = inject(HttpClient);
  private API_URL: string = inject(API_URL);
  private readonly apiUrl: string = `${ this.API_URL }/auth`;

  login(credentials: ICredentials, sessionTimeout: number): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${ this.apiUrl }/login`, { ...credentials, sessionTimeout });
  }

  refreshToken(refreshToken: string, sessionTimeout: number): Observable<IToken> {
    return this.http.post<IToken>(`${ this.apiUrl }/refresh`, { refreshToken, sessionTimeout });
  }

  loadCurrentUser(): Observable<IUser> {
    return this.http.get<IUser>(`${ this.apiUrl }/me`);
  }

}
