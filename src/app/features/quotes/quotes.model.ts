import { QuotesFilter } from './enum/QuotesFilter';
import { ILoadingState } from './interface/ILoadingState';
import { IQuote } from './interface/IQuote';

export interface IQuoteState extends ILoadingState {
  quotes: IQuote[];
  favorites: IQuote[];
  filter: QuotesFilter;
  randomQuote: IQuote | null;
}