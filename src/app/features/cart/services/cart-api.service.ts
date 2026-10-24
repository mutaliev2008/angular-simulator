import { Injectable } from '@angular/core';
import { ICart } from '../interface/ICart';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../../core/services/base-api.service';
import { IModifiedProductCart } from '../interface/IModifiedProductCart';
import { ICreateCart } from '../interface/ICreateCart';
import { ICartResponse } from '../interface/ICartResponse';

@Injectable({
  providedIn: 'root'
})
export class CartApiService extends BaseApiService {

  override key: string = 'carts';

  getCarts(id: number): Observable<ICartResponse> {
    return this.get<ICartResponse>(`user/${ id }`);
  }

  createCart(cart: ICreateCart): Observable<ICart> {
    return this.http.post<ICart>(this.getUrl('add'), cart);
  }

  updateCart(
    cartId: number,
    products: IModifiedProductCart
  ): Observable<ICart> {
    return this.http.put<ICart>(this.getUrl(cartId), {
      merge: true,
      products: [
        {
          products
        }
      ]
    });
  }

  deleteCart(cartId: number): Observable<void> {
    return this.http.delete<void>(this.getUrl(cartId));
  }

}
