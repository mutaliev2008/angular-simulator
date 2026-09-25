import { inject, Injectable } from '@angular/core';
import { AuthApiService } from './auth-api.service';
import { BehaviorSubject, catchError, finalize, Observable, of, tap, throwError } from 'rxjs';
import { IAuthResponse, IToken, IUser } from '../interface/IAuth';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { LoaderService } from '../../../../services/loader.service';
import { ICredentials } from '../interface/ICredentials ';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private authApiService: AuthApiService = inject(AuthApiService);
  private loaderServices: LoaderService = inject(LoaderService);
  private router: Router = inject(Router);

  private localStorage: LocalStorageService = inject(LocalStorageService);

  private authorizedUserSubject: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);
  authorizedUser$: Observable<IUser | null> = this.authorizedUserSubject.asObservable();

  login(credentials: ICredentials): Observable<IAuthResponse> {
    this.loaderServices.showLoader();
    return this.authApiService.login(credentials).pipe(
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

  refresAuthToken(): Observable<IToken | null> {
    const authTokens: IToken | null = this.localStorage.getItem('authTokens'); 
    const refreshToken: string | undefined = authTokens?.refreshToken;

    if (refreshToken) {
      return this.authApiService.refreshToken(refreshToken).pipe(
        tap((tokens: IToken) => {
          this.localStorage.setItem('authTokens', tokens);
        })
      )
    }
    return of(null);
  }

  loadCurrentUser(): Observable<IUser | null> {
    const authTokens: IToken | null = this.localStorage.getItem('authTokens');

    if (authTokens?.accessToken) {
      return this.authApiService.loadCurrentUser().pipe(
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
