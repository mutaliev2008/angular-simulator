import {
  Component,
  debounced,
  effect,
  inject,
  OnInit,
  Resource,
  signal,
  WritableSignal
} from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Skeleton } from 'primeng/skeleton';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ISortOptions } from '../../interfaces/ISortOptions';
import { tap } from 'rxjs';
import { ICategory } from '../../interfaces/ICategory';

@Component({
  selector: 'app-products',
  imports: [
    DataViewModule,
    ProductCardComponent,
    Skeleton,
    PaginatorModule,
    InputTextModule,
    FormsModule,
    SelectModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  productService: ProductService = inject(ProductService);

  searchValue: WritableSignal<string> = signal('');

  debouncedSearch: Resource<string> = debounced(this.searchValue, 300);

  sortOptions: ISortOptions [] = [
    { label: 'Title', value: 'title' },
    { label: 'Price', value: 'price' },
    { label: 'Rating', value: 'rating' },
    { label: 'Stock', value: 'stock' }
  ];

  sortOrderOptions: ISortOptions [] = [
    { label: 'Ascending', value: 'asc' },
    { label: 'Descending', value: 'desc' }
  ];

  sortCategoryOptions: ISortOptions[] = [];

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.productService.getCategories().pipe(
      tap((categories: ICategory[]) => {
        this.sortCategoryOptions = categories.map((category: ICategory) => {
          return {
            label: category.name,
            value: category.slug
          };
        });
      })
    ).subscribe();
  }
  
  constructor() {
    effect(() => {
      this.productService.updateSearchQuery(this.debouncedSearch.value());
    });
  }
  
  repeatRequest(): void {
    this.productService.productResponseResource.reload();
  }

  onPageChange(event: PaginatorState): void {
    this.productService.updateLimit(event.rows ?? 10);
    this.productService.updateSkip(event.first ?? 0);
  }

}
