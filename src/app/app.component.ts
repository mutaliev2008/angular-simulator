import { Component } from '@angular/core';
import { Colors } from '../enum/Color';
import { Collection } from '../collection/collection';
import { users } from '../auth/data/userData';
import { posts } from '../auth/data/postData';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  companyName: string = 'РУМТИБЕТ';
  collectionUsers = new Collection(users);
  collectionPosts = new Collection(posts);

  colors: Colors[] = Object.values(Colors);
  constructor() {
    this.trackLastVisit();
    this.saveOpenWeb();
  }

  checkColor(color: Colors): boolean {
    return this.colors.includes(color);
  }

  trackLastVisit(): void {
    localStorage.setItem('lastVisit', Date.now().toLocaleString());
  }

  saveOpenWeb(): void {
    let quantityOpen: null | string = localStorage.getItem('quantityOpen') || '0';
    if (quantityOpen === null) {
      quantityOpen = '0';
    }

    window.addEventListener('pageshow ', (event) => {
      if (quantityOpen !== null) {
        localStorage.setItem('quantityOpen', `${Number(quantityOpen) + 1}`);
      }
    });
  }
}
