import { Component, computed, inject, model, ModelSignal, Signal } from '@angular/core';
import { ICartProduct } from '../../interfaces/ICart';
import { CartService } from '../../services/cart.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart-product-card',
  imports: [DecimalPipe],
  templateUrl: './cart-product-card.component.html',
  styleUrl: './cart-product-card.component.scss'
})
export class CartProductCardComponent {

  cartProduct: ModelSignal<ICartProduct> = model.required<ICartProduct>();
  cartService: CartService = inject(CartService);

  subtotal: Signal<number> = computed(() => {
    return this.cartProduct().quantity * this.cartProduct().price;
  });

  increment(id: number, quantity: number): void {
    this.cartService.updateQuantity(id, quantity + 1).subscribe();
  }

  decrement(id: number, quantity: number): void {
    this.cartService.updateQuantity(id, quantity - 1).subscribe();
  }

  deleteProduct(id: number): void {
    this.cartService.deleteProduct(id).subscribe();
  }

}
