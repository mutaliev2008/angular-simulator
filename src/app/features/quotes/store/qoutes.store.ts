import { computed, inject } from '@angular/core';
import { IQuoteState } from '../quotes.model';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState
} from '@ngrx/signals';
import { QuoteApiService } from '../qoutes.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, mergeMap, pipe, tap } from 'rxjs';
import { IQuotesResponse } from '../interface/IQuotesResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { IQuote } from '../interface/IQuote';
import { QuotesFilter } from '../enum/QuotesFilter';
import { withLoading } from './features/with-loading';

export const initialQuoteState: IQuoteState = {
  quotes: [],
  favorites: [],
  filter: QuotesFilter.ALL,
  loading: false,
  error: null,
  randomQuote: null
};

export const quotesStore = signalStore(
  { providedIn: 'root' }, 
  withState(initialQuoteState),
  withLoading(),
  withComputed(({ quotes, favorites, filter }) => ({
    favoritesCount: computed(() => favorites().length),
    authorsCount: computed(() => quotes().length),
    filteredQuotes: computed(() => filter() === QuotesFilter.ALL ? quotes() : favorites())
  })),
  withMethods((store, qoutesService: QuoteApiService = inject(QuoteApiService)) => ({
    loadQuotes: rxMethod<void>(
      pipe(
        tap(() => {
          store.setLoading(true);
          store.setError(null);
        }),
        mergeMap(() =>
          qoutesService.getQuotes().pipe(
            tap((qouteResponse: IQuotesResponse) =>
              patchState(store, {
                quotes: qouteResponse.quotes
              })
            ),
            tap(() => store.setLoading(false)),
            catchError((error: HttpErrorResponse) => {
              store.setLoading(false);
              store.setError(error.message);
              return EMPTY;
            })
          )
        )
      )
    ),
    setFilter(filterType: QuotesFilter): void {
      patchState(store, { filter: filterType });
    },
    isFavorite(qouteId: number): boolean {
      return store.favorites().some((qoute: IQuote) => qoute.id === qouteId);
    },
    toggleFavorite(quote: IQuote): void {
      if (this.isFavorite(quote.id)) {
        patchState(store, (state) => ({
          favorites: state.favorites.filter((q) => q.id !== quote.id)
        }));
      } else {
        patchState(store, (state) => ({
          favorites: [...state.favorites, quote]
        }));
      }
    },
    selectRandomQuote(): void {
      const random: number = Math.floor(Math.random() * (store.authorsCount() - 1 + 1)) + 1;

      patchState(store, { randomQuote: store.quotes()[random] });
    }
  }))
);
