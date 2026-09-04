import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MessageService } from '../services/message.service';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  
  const messageService: MessageService = inject(MessageService);

  return next(req).pipe(
    catchError((error:HttpErrorResponse) => {
      if (error.status >= 500) {
        messageService.showError(error.message);
      }
      return throwError(() => error);
    })
  )
};
