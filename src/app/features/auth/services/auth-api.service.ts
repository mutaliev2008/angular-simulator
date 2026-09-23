import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../../core/constants/api.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAuthResponse, ITokens, IUser } from '../interface/IAuth';
import { ICredentials } from '../interface/ICredentials ';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  
  private http: HttpClient = inject(HttpClient);
  private readonly apiUrl: string = `${API_URL}/auth`;

  loginApi(credentials: ICredentials): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${ this.apiUrl }/login`, credentials);
  }

  refreshTokenApi(refreshToken: string | undefined): Observable<ITokens> {
    return this.http.post<ITokens>(`${ this.apiUrl }/refresh`, refreshToken);
  }

  loadCurrentUserApi(): Observable<IUser> {
    return this.http.get<IUser>(`${ this.apiUrl }/me`);
  }

}
