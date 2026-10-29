import {
  Component,
  inject,
  OnInit
} from '@angular/core';
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
  providers: [usersStore]
})
export class UsersComponent implements OnInit {

  store: InstanceType<typeof usersStore> = inject(usersStore);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.store.loadUsers();
  }

}
