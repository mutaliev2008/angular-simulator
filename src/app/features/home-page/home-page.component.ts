import { Component, inject } from '@angular/core';
import { IPopularPlace } from '../../../interface/IPopularPlace';
import { ITravelBlog } from '../../../interface/ITravelBlog';
import { popularPlace, tours, travelBlog } from '../../../data/cardData';
import { ITour } from '../../../interface/ITour';
import { Message } from '../../../enum/Message';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../services/message.service';
import { MessageComponent } from '../../core/components/message/message.component';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, CommonModule, MessageComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  messageService: MessageService = inject(MessageService)

  popularPlace: IPopularPlace[] = popularPlace;
  travelBlog: ITravelBlog[] = travelBlog;
  tours: ITour[] = tours;

  liveInputValue: string = '';
  isLoading: boolean = true;
  tourParticipants: string = '';
  tourDate!: string;
  tourLocation: string = '';

  messageType: typeof Message = Message;
}
