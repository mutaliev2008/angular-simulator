import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';
import { ILoadingState } from '../../interface/ILoadingState';

const withLoaindgState: ILoadingState = {
  loading: false,
  error: null
};

export function withLoading() {
  return signalStoreFeature(
    withState(withLoaindgState),
    withMethods((store) => ({
      setLoading(value: boolean): void {
        patchState(store, { loading: value });
      },
      setError(message: null | string): void {
        patchState(store, { error: message });
      }
    }))
  );
}