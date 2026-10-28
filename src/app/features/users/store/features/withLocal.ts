import { signalStoreFeature, withMethods } from '@ngrx/signals';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { inject } from '@angular/core';

export function withLocal() {
  return signalStoreFeature(
    withMethods(
      (store, localStorageService: LocalStorageService = inject(LocalStorageService)) => ({
        setItem<T>(key: string, items: T): void {
          localStorageService.setItem(key, items);
        },
        getItem<T>(key: string): T | null {
          return localStorageService.getItem(key);
        }
      })
    )
  );
}
