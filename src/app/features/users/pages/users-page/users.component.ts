import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../../services/user.service';
import { BehaviorSubject, combineLatest, map, Observable,  } from 'rxjs';
import { IUser } from '../../../../../interface/IUser';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UsersFilterComponent } from "../users-filter/users-filter.component";
import { PluralPipe } from '../../../../shared/pipes/plural.pipe';

@Component({
  selector: 'app-users-page',
  imports: [CommonModule, UserCardComponent, UserCreateComponent, UsersFilterComponent, UsersFilterComponent, PluralPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  
  destroyRef = inject(DestroyRef);
  userService: UserService = inject(UserService);

  users$: Observable<IUser[]> = this.userService.users$;
  filteredSubject: BehaviorSubject<string> =  new BehaviorSubject<string>('');
  filteredUsers$: Observable<IUser[]> = combineLatest([this.userService.users$, this.filteredSubject]).pipe(
    map(([users, filter]: [IUser[], string]) => {
     return users.filter((user: IUser) => user.name.toLowerCase().trim().includes(filter));
    })
  )

  ngOnInit(): void {
    this.userService.loadUsers().subscribe();
  }

  searchUser(name: string): void {
    this.filteredSubject.next(name);
  }

}
