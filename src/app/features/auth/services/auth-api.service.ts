import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../../core/constants/api.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthResponse, IToken, IUser } from '../interface/IAuth';
import { ICredentials } from '../interface/ICredentials ';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  
  private http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = `${ API_URL }/auth`;

  login(credentials: ICredentials, sessionTimeout: number): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${ this.apiUrl }/login`, { credentials, sessionTimeout });
  }

  refreshToken(refreshToken: string, sessionTimeout: number): Observable<IToken> {
    return this.http.post<IToken>(`${ this.apiUrl }/refresh`, { refreshToken, sessionTimeout });
  }

  loadCurrentUser(): Observable<IUser> {
    return this.http.get<IUser>(`${ this.apiUrl }/me`);
  }

}
