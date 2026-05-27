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

  collectionUsers = new Collection<IUser>(users);
  collectionPosts = new Collection<IPost>(posts);

  constructor() {
    this.trackLastVisit();
    this.saveOpenWeb();
  }

  checkColor(color: Color): boolean {
    const basicColor = [Color.BLUE, Color.GREEN, Color.RED]
    return basicColor.includes(color)
  }

  trackLastVisit(): void {
    localStorage.setItem('lastVisit', Date.now().toLocaleString());
  }

  saveOpenWeb(): void {
    let quantityOpen: null | string = localStorage.getItem('quantityOpen') || '0';
    localStorage.setItem('quantityOpen', `${Number(quantityOpen) + 1}`)

  }
}
