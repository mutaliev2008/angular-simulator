import { ProductSortField } from '../enum/ProductSortField';
import { SortDirection } from '../enum/SortDirection';

export interface IProductsQuery {
  skip?: number;
  limit?: number;
  q?: string;
  sortBy?: ProductSortField;
  order?: SortDirection;
  category?: string;
}
