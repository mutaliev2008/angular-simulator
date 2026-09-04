import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      const initialTime: number = Date.now();
      console.log(req.method);
      console.log(req.url);
      
      if (event instanceof HttpResponse) {
        const requestCompletionTime: number = Date.now() - initialTime;
        console.log(event.status);
        console.log(requestCompletionTime);
      }
    })
  );
};
