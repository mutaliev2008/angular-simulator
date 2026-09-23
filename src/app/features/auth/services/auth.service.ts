import { inject, Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { BehaviorSubject, catchError, finalize, Observable, of, tap, throwError } from 'rxjs';
import { IAuthResponse, ITokens, IUser } from '../interface/IAuth';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { LoaderService } from '../../../../services/loader.service';
import { ICredentials } from '../interface/ICredentials ';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  authApiService: AuthApiService = inject(AuthApiService);
  loaderServices: LoaderService = inject(LoaderService);
  router: Router = inject(Router);

  private localStorage: LocalStorageService = inject(LocalStorageService);

  private authorizedUserSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  authorizedUser$: Observable<IUser | null> = this.authorizedUserSubject.asObservable();

  login(credentials: ICredentials): Observable<IAuthResponse> {
    this.loaderServices.showLoader();
    return this.authApiService.loginApi(credentials).pipe(
      tap((authResponse: IAuthResponse) => {
        const { accessToken, refreshToken, ...user } = authResponse;

        this.setUser(user);
        this.localStorage.setItem('authTokens', { accessToken, refreshToken });
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }),
      finalize(() => {
        this.loaderServices.hideLoader();
      }),
    );
  }

  logout(): void {
    this.router.navigate(['/auth/login']);
    this.localStorage.removeItem('authTokens');
    this.setUser(null);
  }

  refresAuthToken(): Observable<ITokens> {
    const authTokens: ITokens | null = this.localStorage.getItem('authTokens'); 
    const refreshToken: string | undefined = authTokens?.refreshToken;

    return this.authApiService.refreshTokenApi(refreshToken).pipe(
      tap((tokens: ITokens) => {
        this.localStorage.setItem('authTokens', tokens);
      })
    )
  }

  loadCurrentUser(): Observable<IUser | null> {
    const authTokens: ITokens | null = this.localStorage.getItem('authTokens');

    if (authTokens?.accessToken) {
      return this.authApiService.loadCurrentUserApi().pipe(
        tap((user:IUser) => {
          this.setUser(user);
          console.log(user)
        })
      )
    }

    return of(null);
  }

  private setUser(user: IUser | null): void {
    this.authorizedUserSubject.next(user);
  }
}
