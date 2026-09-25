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
import { IToken } from '../interface/IAuth';

function addAuthHeader(req: HttpRequest<unknown>, token: string | undefined): HttpRequest<unknown> {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${ token }`,
    },
  });
}

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {

  const authService: AuthService = inject(AuthService);
  const localStorageService = inject(LocalStorageService);
  const authTokens: IToken | null = localStorageService.getItem('authTokens');

  if (!authTokens?.accessToken) {
    return next(req);
  }

  const authReq: HttpRequest<unknown> = addAuthHeader(req, authTokens.accessToken);

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refresAuthToken().pipe(
          switchMap((tokens: IToken | null) => {
            return next(addAuthHeader(req, tokens?.accessToken));
          }),
          catchError((err: HttpErrorResponse) => {
            authService.logout();
            return throwError(() => err);
          }),
        );
      }
      return throwError(() => error);
    }),
  );
  
};
