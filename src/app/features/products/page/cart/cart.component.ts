import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { CartProductCardComponent } from '../../components/cart-product-card/cart-product-card.component';
import { CartSummaryComponent } from '../../components/cart-summary/cart-summary.component';
import { catchError, finalize, of } from 'rxjs';


@Component({
  selector: 'app-cart',
  imports: [RouterLink, CartProductCardComponent, CartSummaryComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  cartService: CartService = inject(CartService);
  readonly isLoading: WritableSignal<boolean> = signal(false);
  readonly hasError: WritableSignal<boolean> = signal(false);

  ngOnInit() {
    this.loadCart();
  }

  loadCart(): void{
    if (!this.cartService.cart()) {
      this.isLoading.set(true);

      this.cartService.getUserCart().pipe(
        finalize(() => this.isLoading.set(false)),
        catchError(() => {
          this.hasError.set(true);
          return of(null);
        })
      ).subscribe();
    }
  }

}
