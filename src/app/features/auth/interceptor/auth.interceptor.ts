import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { ITokens } from '../interface/IAuth';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {

  const authService: AuthService = inject(AuthService);
  const localStorageService = inject(LocalStorageService);
  const authTokens: ITokens | null = localStorageService.getItem('authTokens');

  if (!authTokens?.accessToken) {
    return next(req);
  }
  
  const authReq: HttpRequest<unknown> = req.clone({
    setHeaders: {
        Authorization: `Bearer ${ authTokens?.accessToken }`
    }
  })

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
            return authService.refresAuthToken().pipe(
              switchMap((tokens: ITokens) => {
                return next(
                  req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${ tokens.accessToken }`
                    }
                  })
                );
              }),
              catchError((err: HttpErrorResponse) => {
                authService.logout();
                return throwError(() => err);     
              })
            );
        }
        return throwError(() => error)
    })
  )

};
