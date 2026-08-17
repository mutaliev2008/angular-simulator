import { Component, inject } from '@angular/core';
import { ViewMode } from '../../../../enum/ViewMode';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { INavLink } from '../../../../enum/INavLink';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../../services/theme.service';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { tap } from 'rxjs';
import { AppTheme } from '../../../../enum/AppTheme';
import { IThemeOption  } from '../../../../interface/IThemeOption';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';

type currentView = 'date' | 'count';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    ToggleSwitch,
    FontAwesomeModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    SelectButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  
  themeService: ThemeService = inject(ThemeService);

  stateOptions: IThemeOption [] = [
    { label: 'Nora', value: AppTheme.NORA },
    { label: 'Aura', value: AppTheme.AURA },
    { label: 'Lara', value: AppTheme.LARA },
  ];
  navLinks: INavLink[] = [
    { path: '/', label: 'Главная' },
    { path: '/users', label: 'Пользователи' },
  ];
  viewMode: typeof ViewMode = ViewMode;
  currentView: currentView = 'date';
  currentQuantity: number = 0;
  timerValue!: string;
  companyName: string = 'РУМТИБЕТ';
  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;

  constructor() {
    this.updateTimer();
    this.themeService.darkThemeActive$.subscribe();
    this.themeService.colorMode$.subscribe();
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
