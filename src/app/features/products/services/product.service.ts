import {
  computed,
  effect,
  inject,
  Injectable,
  ResourceRef,
  signal,
  Signal,
  WritableSignal
} from '@angular/core';
import { ProductApiService } from './product-api.service';
import { IProduct, IProductsQuery, ProductSortField, SortDirection } from '../interfaces/IProduct';
import { Observable } from 'rxjs';
import { IProductResponse } from '../interfaces/IProductResponse';
import { rxResource } from '@angular/core/rxjs-interop';
import { ICategory } from '../interfaces/ICategory';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productApiService: ProductApiService = inject(ProductApiService);

  skip: WritableSignal<number> = signal(0);
  limit: WritableSignal<number> = signal(10);
  searchQuery: WritableSignal<string> = signal('');
  sortBy: WritableSignal<ProductSortField | undefined> = signal(undefined);
  order: WritableSignal<SortDirection | undefined> = signal(undefined);
  category: WritableSignal<string | undefined> = signal(undefined);

  products: Signal<IProduct[]> = computed(
    () => this.productResponseResource.value()?.products ?? []
  );

  constructor() {
    effect(() => {
      this.searchQuery();
      this.sortBy();
      this.order();
      this.category();

      this.skip.set(0);
    });
  }

  private productsQuery: Signal<IProductsQuery> = computed(() => ({
    limit: this.limit(),
    skip: this.skip(),
    q: this.searchQuery(),
    sortBy: this.sortBy(),
    order: this.order(),
    category: this.category()
  }));

  productResponseResource: ResourceRef<IProductResponse | undefined> =
    rxResource({
      params: () => this.productsQuery(),
      stream: ({ params: queryParams }) => {
        return this.productApiService.getProducts(queryParams);
      }
    });

  getProductById(id: number): Observable<IProduct> {
    return this.productApiService.getProductById(id);
  }
  
  getCategories(): Observable<ICategory[]> {
    return this.productApiService.getCategories();
  }

  updateSkip(newSkip: number): void {
    this.skip.set(newSkip);
  }

  updateLimit(newLimit: number): void {
    this.limit.set(newLimit);
  }

  updateSearchQuery(newSearchQuery: string): void {
    this.updateSkip(0);
    this.searchQuery.set(newSearchQuery);
  }

}
