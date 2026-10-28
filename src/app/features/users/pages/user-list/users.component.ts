import {
  Component,
  computed,
  inject,
  OnInit,
  Signal
} from '@angular/core';
import { IUser } from '../../interface/IUser';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UsersFilterComponent } from '../users-filter/users-filter.component';
import { PluralPipe } from '../../../../shared/pipes/plural.pipe';
import { usersStore } from '../../store/users.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-page',
  imports: [
    CommonModule,
    UserCardComponent,
    UserCreateComponent,
    UsersFilterComponent,
    UsersFilterComponent,
    PluralPipe
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {

  store: InstanceType<typeof usersStore> = inject(usersStore);
  router: Router = inject(Router);

  filteredUsers: Signal<IUser[]> = computed(() =>
    this.store
      .users()
      .filter((user: IUser) =>
        user.name.toLowerCase().trim().includes(this.store.searchQuery())
      )
  );

  ngOnInit(): void {
    this.store.loadUsers();
  }

}
