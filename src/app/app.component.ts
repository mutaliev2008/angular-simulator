import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Color } from '../enum/Color';
import { Collection } from '../collection/collection';
import { users } from '../data/userData';
import { posts } from '../data/postData';
import { IPost } from '../interface/IPost';
import { IClient } from '../interface/IClient';
import { popularPlace, tours, travelBlog } from '../data/cardData';
import { FormsModule } from '@angular/forms';
import { ITour } from '../interface/ITour';
import { IPopularPlace } from '../interface/IPopularPlace';
import { ITravelBlog } from '../interface/ITravelBlog';
import { CommonModule } from '@angular/common';
import { Message } from '../enum/Message';
import { LocalStorageService } from '../services/local-storage.service';
import { FooterComponent } from './core/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { LoaderComponent } from './core/components/loader/loader.component';
import { MessageComponent } from './core/components/message/message.component';
import { HeaderComponent } from './core/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, FooterComponent, HeaderComponent, MessageComponent, RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  localStorageServices: LocalStorageService = inject(LocalStorageService);
  loaderService: LoaderService = inject(LoaderService);

  popularPlace: IPopularPlace[] = popularPlace;
  travelBlog: ITravelBlog[] = travelBlog;
  tours: ITour[] = tours;

  messageType: typeof Message = Message;

  collectionUsers: Collection<IClient> = new Collection<IClient>(users);
  collectionPosts: Collection<IPost> = new Collection<IPost>(posts);

  constructor() {
    this.trackLastVisit();
    this.trackPageOpen();
    this.loaderService.showLoader();

    setTimeout(() => {
      this.loaderService.hideLoader();
    }, 3000);
  }

  isPrimaryColor(color: Color): boolean {
    const basicColor: string[] = [Color.BLUE, Color.GREEN, Color.RED];
    return basicColor.includes(color);
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
