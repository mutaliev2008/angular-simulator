import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { APP_CONFIG } from '../app/core/tokens/app-configuration.token';
import { inject } from '@angular/core';
import { IAppConfig } from '../interface/IAppConfig';

export const loggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const initialTime: number = Date.now();

  const config: IAppConfig = inject(APP_CONFIG);

  if (!config.enableLogs) return next(req);
  
  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        const requestCompletionTime: number = Date.now() - initialTime;
        console.warn(requestCompletionTime);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      const requestCompletionTime: number = Date.now() - initialTime;
      console.warn(requestCompletionTime);
      return throwError(() => error);
    })
  );
};
