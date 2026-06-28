import { Component, inject } from '@angular/core';
import { Color } from '../enum/Color';
import { Collection } from '../collection/collection';
import { users } from '../data/userData';
import { posts } from '../data/postData';
import { IPost } from '../interface/IPost';
import { IUser } from '../interface/IUser';
import { popularPlace, tours, travelBlog } from '../data/cardData';
import { FormsModule } from '@angular/forms';
import { ITour } from '../interface/ITour';
import { IPopularPlace } from '../interface/IPopularPlace';
import { ITravelBlog } from '../interface/ITravelBlog';
import { CommonModule } from '@angular/common';
import { Message } from '../enum/Message';
import { LocalStorageService } from '../services/local-storage.service';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, FooterComponent, HeaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  localStorageServices: LocalStorageService = inject(LocalStorageService);

  popularPlace: IPopularPlace[] = popularPlace;
  travelBlog: ITravelBlog[] = travelBlog;
  tours: ITour[] = tours;

  liveInputValue: string = '';
  isLoading: boolean = true;
  tourParticipants: string = '';
  tourDate!: string;
  tourLocation: string = '';

  viewMessage: typeof Message = Message;

  collectionUsers: Collection<IUser> = new Collection<IUser>(users);
  collectionPosts: Collection<IPost> = new Collection<IPost>(posts);

  constructor() {
    this.trackLastVisit();
    this.trackPageOpen();
    this.toggleLoading();
  }

  isPrimaryColor(color: Color): boolean {
    const basicColor: string[] = [Color.BLUE, Color.GREEN, Color.RED];
    return basicColor.includes(color);
  }

  toggleLoading(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  private trackLastVisit(): void {
    this.localStorageServices.setItem('lastVisit', Date.now().toLocaleString());
  }

  private trackPageOpen(): void {
    let currentCount: number = Number(this.localStorageServices.getItem('quantity-visit') || '0');
    currentCount = currentCount + 1;
    this.localStorageServices.setItem('quantity-visit', currentCount.toString());
  }
}

