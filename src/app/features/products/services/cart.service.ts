import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ICart } from '../interfaces/ICart';
import { CartApiService } from './cart-api.service';
import { AuthService } from '../../auth/services/auth.service';
import { Observable, tap } from 'rxjs';
import { IModifiedProductCart } from '../interfaces/IModifiedProductCart';
import { ICreateCart } from '../interfaces/ICreateCart';
import { ICartProduct } from '../interfaces/ICartProduct';
import { ICartResponse } from '../interfaces/ICartResponse';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartApiService: CartApiService = inject(CartApiService);
  private authService: AuthService = inject(AuthService);
  private userId: number = this.authService.getUserId()!; 

  cart: WritableSignal<ICart | null> = signal(null);

  readonly subtotal: Signal<number> = computed((): number => {
    if (!this.cart()) {
      return 0;
    }
    return this.cart()!.products.reduce((acc: number, product: ICartProduct) => acc += product.quantity * product.price, 0);
  });

  readonly itemsTotal: Signal<number> = computed((): number => {
    if (!this.cart()) {
      return 0;
    }
    return this.cart()!.products.length;
  });
  
  readonly tax: Signal<number> = computed(() => {
    return this.subtotal() * 0.2; 
  });
  
  readonly total: Signal<number> = computed(() => {
    return this.subtotal() + this.tax();
  });

  getUserCart(): Observable<ICartResponse> {
    return this.cartApiService.getCarts(this.userId).pipe(
      tap((cartResponse: ICartResponse) => {
        this.cart.set(cartResponse.carts[0]);
      })
    );
  }

  createCart(cart: ICart): Observable<ICart> {
    return this.cartApiService.createCart(cart);
  }

  updateCart(modifeidProduct: IModifiedProductCart): Observable<ICart> {
    let cart$: Observable<ICart>;
    
    if (!this.cart()) {
      const newCart: ICreateCart = {
        userId: this.userId,
        products: [{ ...modifeidProduct }]
      };
      
      cart$ = this.cartApiService.createCart(newCart);
    } else {
      cart$ = this.cartApiService.updateCart(this.cart()!.id, modifeidProduct);
    }

    return cart$.pipe(
      tap((cart: ICart) => this.cart.set(cart))
    );
  }

  updateQuantity(productId: number, quantity: number): Observable<ICart> {
    return this.updateCart({ id: productId, quantity }).pipe(
      tap((cart: ICart) => {
        this.cart.set(cart);
      })
    );
  }

  deleteProduct(productId: number): Observable<ICart> {
    return this.updateCart({ id: productId, quantity: 0 }).pipe(
      tap((cart: ICart) => {
        this.cart.set(cart);
      })
    );
  }

  deleteCart(): Observable<void> {
    this.cart.set(null);
    return this.cartApiService.deleteCart(this.cart()!.id);
  }

}

