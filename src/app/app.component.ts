import { Component } from '@angular/core';
import { Color, SwitchBtnStatus } from '../enum/Color';
import { Collection } from '../collection/collection';
import { users } from '../auth/data/userData';
import { posts } from '../auth/data/postData';
import { IPost } from '../auth/interface/IPost';
import { IUser } from '../auth/interface/IUser';
import { NgStyle } from '@angular/common';
import { tours } from '../auth/data/cardData';
import { FormsModule } from '@angular/forms';
import { ITour } from '../auth/interface/ITour';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  tours: ITour[] = tours;
  companyName: string = 'РУМТИБЕТ';
  timerValue: string = '';
  tourLocation: string = '';
  tourDate: string = '';
  tourParticipants: string = '';
  currentQuantity: number = 0;
  liveInputValue: string = '';
  isLoading: boolean = true;
  switchBtnStatus: SwitchBtnStatus = 'date'

  collectionUsers: Collection<IUser> = new Collection<IUser>(users);
  collectionPosts: Collection<IPost> = new Collection<IPost>(posts);

  constructor() {
    this.trackLastVisit();
    this.trackPageOpen();
    this.updateTimer();
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

  reduceQuantity(): void {
    this.currentQuantity -= 1;
  }

  addQuantity(): void {
    this.currentQuantity += 1;
  }

  changeSwitchContent(status: SwitchBtnStatus): void {
    this.switchBtnStatus = status;
  }

  private updateTimer(): void {
    setInterval(() => {
      this.timerValue = new Date().toLocaleString();
    }, 1000);
  }

  private trackLastVisit(): void {
    localStorage.setItem('lastVisit', Date.now().toLocaleString());
  }

  private trackPageOpen(): void {
    let currentCount: number = Number(localStorage.getItem('quantity-visit') || '0');
    currentCount = currentCount + 1;
    localStorage.setItem('quantity-visit', currentCount.toString());
  }
}
