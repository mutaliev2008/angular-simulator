import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductService } from '../services/product.service';
import { IProduct } from '../interfaces/IProduct';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../../../core/services/message.service';

export const productResolver: ResolveFn<IProduct> = (route) => {
  const productServices: ProductService = inject(ProductService);
  const productId: number = Number(route.paramMap.get('id'))!;
  const messageService: MessageService = inject(MessageService); 
    
  return productServices.getProductById(productId).pipe(
    catchError((error: HttpErrorResponse) => {
      messageService.showError(error.error.message);
      return throwError(() => error);
    })
  );
};
