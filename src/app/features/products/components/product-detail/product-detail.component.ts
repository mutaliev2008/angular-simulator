import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../interfaces/IProduct';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, DecimalPipe, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit{

  product: WritableSignal<IProduct | null> = signal(null);
  productServices: ProductService = inject(ProductService);
  route: ActivatedRoute = inject(ActivatedRoute);
  cartService: CartService = inject(CartService);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const routerProduct: IProduct = this.route.snapshot.data['product']; 
    this.product.set(routerProduct);
  }

  addProduct(id: number): void {
    this.cartService.updateCart({ id, quantity: 1 }).pipe(
      tap(() => {
        this.router.navigate(['/products/cart']);
      })
    ).subscribe();
  }

}
