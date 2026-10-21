import { Component, input, InputSignal } from '@angular/core';
import { IProduct } from '../../interfaces/IProduct';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CardModule, TagModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  product: InputSignal<IProduct> = input.required<IProduct>();
}
