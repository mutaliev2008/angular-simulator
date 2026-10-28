import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { IUsersState } from "../interface/IUsersState";
import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { UserApiService } from "../services/user-api.service";
import { computed, inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { catchError, EMPTY, mergeMap, pipe, tap } from "rxjs";
import { withLoading } from "../../quotes/store/features/with-loading";
import { IUser } from "../interface/IUser";
import { HttpErrorResponse } from "@angular/common/http";
import { withLocal } from "./features/withLocal";
import { withSyncToRouteQueryParams, getQueryMapperForState } from '@ngrx-traits/signals';

const initialState: IUsersState = {
  users: [],
  searchQuery: ''
};

export const usersStore = signalStore(
  { providedIn: 'root' },
  withDevtools('quotes'),
  withState(initialState),
  withLoading(),
  withLocal(),
  withComputed(({ searchQuery, users }) => ({
    filteredUsers: computed(() => {
      if(users().length === 0) {
        return [];
      }
      return users().filter((user: IUser) =>
        user.name.toLowerCase().trim().includes(searchQuery())
      );
    })
  })),
  withMethods(
    (store, usersService: UserApiService = inject(UserApiService)) => ({
      setUsers(users: IUser[]): void {
        patchState(store, { users: users });
        store.setItem('users', users);
      },
      loadUsers: rxMethod<void>(
        pipe(
          tap(() => {
            store.setLoading(true);
            store.setError(null);
          }),
          mergeMap(() => {
            const localData: IUser[] | null = store.getItem<IUser[]>('users');
            if (localData && localData.length > 0) {
              patchState(store, { users: localData });
              store.setLoading(false);
              return EMPTY;
            }
            return usersService.getUsers().pipe(
              tap((users: IUser[]) => {
                store.setLoading(false);
                patchState(store, { users: users });
              }),
              catchError((error: HttpErrorResponse) => {
                store.setError(error.message);
                store.setLoading(false);
                return EMPTY;
              })
            );
          })
        )
      ),
      createUser(user: IUser): void {
        const newUserList: IUser[] = [user, ...store.users()];
        this.setUsers(newUserList);
      },
      removeUsers(userId: number): void {
        const newUserList: IUser[] = store.users().filter((u: IUser) => userId !== u.id);
        this.setUsers(newUserList);
      },
      updateSearch(query: string): void {
        patchState(store, { searchQuery: query });
      }
    })
  ),
  withSyncToRouteQueryParams({
    mappers: [
      getQueryMapperForState({
        searchQuery: 'string'
      })
    ]
  })
  
);