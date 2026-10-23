import { Injectable } from '@angular/core';
import { IProductResponse } from '../interfaces/IProductResponse';
import { IProduct } from '../interfaces/IProduct';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/ICategory';
import { BaseApiService } from '../../../core/api-services/base-api.service';
import { IProductsQuery } from '../interfaces/IProductsQuery';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService extends BaseApiService {

  override key: string = 'products';  

  getProducts(query: IProductsQuery): Observable<IProductResponse> {
    const url: string = query.q?.trim() ? '/search' : '';
    if (query.category) {
      return this.getProductByCategory(query);
    }

    return this.get<IProductResponse>(url, query);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.get<IProduct>(`${ id }`);
  }

  getCategories(): Observable<ICategory[]> {
    return this.get<ICategory[]>(`categories`);
  }

  getProductByCategory(filteredQuery: IProductsQuery): Observable<IProductResponse> {
    return this.get<IProductResponse>(`category/${ filteredQuery.category }`, filteredQuery);
  }
  
}