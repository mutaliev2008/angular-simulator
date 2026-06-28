import { Component, inject } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { MessageComponent } from '../../core/components/message/message.component';
import { Message } from '../../../enum/Message';

@Component({
  selector: 'app-users-page',
  imports: [MessageComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {
  messageService: MessageService = inject(MessageService)
  messageType: typeof Message = Message;
}
