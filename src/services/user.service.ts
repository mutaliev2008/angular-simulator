import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap, throwError } from 'rxjs';
import { IUser } from '../interface/IUser';
import { UserApiService } from './user-api.service';
import { captureError } from 'rxjs/internal/util/errorContext';
import { MessageService } from './message.service';
import { LoaderComponent } from '../app/core/components/loader/loader.component';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private userApiService: UserApiService = inject(UserApiService);
  private messageService: MessageService = inject(MessageService);
  private loaderService: LoaderService = inject(LoaderService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();
  
  loadUsers(): void {
      this.userApiService.getUsers()
        .pipe(
          tap((users) => {
            this.loaderService.showLoader();
            this.setUsers(users);

          }),
          catchError((err) => {
            this.messageService.showError(err);
            return of([]);
          }),
          finalize(() => {
            setTimeout(() => {
              this.loaderService.hideLoader();
            }, 3000);
          })
        )
        .subscribe()
  }

  getUsers(): IUser[] {
    return this.usersSubject.value;
  }

  setUsers(users: IUser[]) {
    this.usersSubject.next(users);
  }

}
