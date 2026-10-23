import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthResponse, IToken, IUser } from '../interface/IAuth';
import { ICredentials } from '../interface/ICredentials ';
import { APP_CONFIG } from '../../../core/tokens/app-configuration.token';
import { IAppConfig } from '../../../../interface/IAppConfig';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  
  private http: HttpClient = inject(HttpClient);
  private APP_CONFIG: IAppConfig = inject(APP_CONFIG);
  private readonly apiUrl: string = `${ this.APP_CONFIG.apiUrl }/auth`;

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
