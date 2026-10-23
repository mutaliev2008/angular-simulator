import { Component, inject, input, InputSignal } from '@angular/core';
import { ICart } from '../../interfaces/ICart';
import { CartService } from '../../services/cart.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cart-summary',
  imports: [DecimalPipe],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.scss'
})
export class CartSummaryComponent {

  cart: InputSignal<ICart | null> = input.required<ICart | null>();
  cartService: CartService = inject(CartService);

}
