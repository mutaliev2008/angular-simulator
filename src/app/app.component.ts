import { Component, inject } from '@angular/core';
import { Color } from './features/training/enum/Color';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './core/services/local-storage.service';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './core/services/loader.service';
import { LoaderComponent } from './shared/ui/loader/loader.component';
import { MessageComponent } from './shared/ui/message/message.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, MessageComponent, RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  localStorageServices: LocalStorageService = inject(LocalStorageService);
  loaderService: LoaderService = inject(LoaderService);

  constructor() {
    this.trackLastVisit();
    this.trackPageOpen();
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
