import { Component } from '@angular/core';
import { Color } from '../enum/Color';
import { Collection } from '../collection/collection';
import { users } from '../auth/data/userData';
import { posts } from '../auth/data/postData';
import { IPost } from '../auth/interface/IPost';
import { IUser } from '../auth/interface/IUser';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  companyName: string = 'РУМТИБЕТ';

  collectionUsers: Collection<IUser> = new Collection<IUser>(users);
  collectionPosts: Collection<IPost> = new Collection<IPost>(posts);

  constructor() {
    this.trackLastVisit();
    this.saveOpenWeb();
  }

  isPrimaryColor(color: Color): boolean {
    const basicColor: string[] = [Color.BLUE, Color.GREEN, Color.RED];
    return basicColor.includes(color);
  }

  trackLastVisit(): void {
    localStorage.setItem('lastVisit', Date.now().toLocaleString());
  }

  saveOpenWeb(): void {
    let quantityOpen: string = localStorage.getItem('quantityOpen') || '0';
    localStorage.setItem('quantityOpen', `${Number(quantityOpen) + 1}`);
  }
}
