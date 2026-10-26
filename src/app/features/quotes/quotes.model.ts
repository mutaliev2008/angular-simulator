import { QuotesFilter } from './enum/QuotesFilter';
import { IQuote } from './interface/IQuote';

export interface IQuoteState {
  quotes: IQuote[];
  favorites: IQuote[];
  loading: boolean;
  filter: QuotesFilter;
  randomQuote: IQuote | null;
  error: string | null;
}