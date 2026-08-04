import { Component, inject } from '@angular/core';
import { ViewMode } from '../../../../enum/ViewMode';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { INavLink } from '../../../../enum/INavLink';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../../services/theme.service';

type currentView = 'date' | 'count';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ToggleSwitch, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService)

  navLinks: INavLink[] = [
    { path: '/', label: 'Главная' },
    { path: '/users', label: 'Пользователи' },
  ];
  viewMode: typeof ViewMode = ViewMode;
  currentView: currentView = 'date';
  currentQuantity: number = 0;
  timerValue!: string;
  companyName: string = 'РУМТИБЕТ';

  constructor() {
    this.updateTimer();
  }

  changeCurrentView(status: currentView): void {
    this.currentView = status;
  }

  reduceQuantity(): void {
    this.currentQuantity -= 1;
  }

  addQuantity(): void {
    this.currentQuantity += 1;
  }

  private updateTimer(): void {
    setInterval(() => {
      this.timerValue = new Date().toLocaleString();
    }, 1000);
  }
  
}
