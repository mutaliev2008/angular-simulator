import { Component, inject } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { MessageComponent } from '../../core/components/message/message.component';
import { Message } from '../../../enum/Message';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { IUser } from '../../../interface/IUser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-page',
  imports: [CommonModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.users$;

  ngOnInit() {
    this.userService.loadUsers();
  }

}
