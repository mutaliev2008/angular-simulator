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
import { ButtonModule } from 'primeng/button';
import { faPlay, faShield, faStar, faTag, faUsers, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, CommonModule, MessageComponent, ButtonModule, FontAwesomeModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  messageService: MessageService = inject(MessageService);

  popularPlace: IPopularPlace[] = popularPlace;
  travelBlog: ITravelBlog[] = travelBlog;
  tours: ITour[] = tours;

  liveInputValue: string = '';
  isLoading: boolean = true;
  tourParticipants: string = '';
  tourDate!: string;
  tourLocation: string = '';

  messageType: typeof Message = Message;

  faPlay: IconDefinition = faPlay;
  faSheild: IconDefinition = faShield;
  faUsers: IconDefinition = faUsers;
  faTag: IconDefinition = faTag;
  faStar: IconDefinition = faStar;

}
