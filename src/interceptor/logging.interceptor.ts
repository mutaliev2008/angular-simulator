import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  
  const initialTime: number = Date.now();
  console.log(`Метод запроса ${req.method}`);
  console.log(`URL запроса ${req.url}`);

  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        const requestCompletionTime: number = Date.now() - initialTime;
        console.log(`Cтатус ответа ${event.status}`);
        console.log(`Время выполнения запроса ${requestCompletionTime}`);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      const requestCompletionTime: number = Date.now() - initialTime;

      console.log(`Время выполнения запроса ${requestCompletionTime}`);
      console.log(`Cтатус ответа ${error.status}`);
      
      return throwError(() => error)
    })
  );
};
