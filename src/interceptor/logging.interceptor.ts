import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  
  const initialTime: number = Date.now();
  console.log(req.method);
  console.log(req.url);

  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        const requestCompletionTime: number = Date.now() - initialTime;
        console.log(event.status);
        console.log(requestCompletionTime);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      const requestCompletionTime: number = Date.now() - initialTime;

      console.log(requestCompletionTime);
      console.log(error.status);
      
      return throwError(() => error)
    })
  );
};
