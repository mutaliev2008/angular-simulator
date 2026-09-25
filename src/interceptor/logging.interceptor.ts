import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  
  const initialTime: number = Date.now();

  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        const requestCompletionTime: number = Date.now() - initialTime;
      }
    }),
    catchError((error: HttpErrorResponse) => {
      const requestCompletionTime: number = Date.now() - initialTime;

      
      return throwError(() => error)
    })
  );

};
