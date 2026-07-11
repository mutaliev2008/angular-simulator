import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { IUser } from '../interface/IUser';
import { UserApiService } from './user-api.service';
import { captureError } from 'rxjs/internal/util/errorContext';
import { MessageService } from './message.service';
import { LoaderComponent } from '../app/core/components/loader/loader.component';
import { LoaderService } from './loader.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private userApiService: UserApiService = inject(UserApiService);
  private messageService: MessageService = inject(MessageService);
  private loaderService: LoaderService = inject(LoaderService);
  private localStorageService: LocalStorageService = inject(LocalStorageService)

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();
  
  loadUsers(): Observable<IUser[]> {
    const localData: IUser[] | null = this.localStorageService.getItem('users')
    const condition: IUser[] = localData !== null? localData : this.userApiService.getUsers()
    this.loaderService.showLoader();
      return of(condition)
        .pipe(
            tap((users: IUser[]) => {
              this.setUsers(users);
              if(condition) {
                this.localStorageService.setItem('users', users)
              }
            }),
            catchError((err: string) => {
              this.messageService.showError(err);
              return of([]);
            }),
            finalize(() => {
              this.loaderService.hideLoader();
            })
          )
  }

  getUsers(): IUser[] {
    return this.usersSubject.value;
  }

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    this.localStorageService.setItem('users', users)
  }

  createUsers(user: IUser): void {
    const newUserList: IUser[] = [user, ...this.getUsers()]
    this.setUsers(newUserList)
    this.localStorageService.setItem('users', newUserList)
  }

  removeUsers(deletedUser: IUser): void {
    const updatedUsers: IUser[] = this.getUsers().filter((user: IUser) => user !== deletedUser)
    this.usersSubject.next(updatedUsers)
    this.localStorageService.setItem('users', updatedUsers)
  }

}
