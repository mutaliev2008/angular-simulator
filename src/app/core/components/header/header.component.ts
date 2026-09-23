import { Component, inject, OnInit } from '@angular/core';
import { ViewMode } from '../../../../enum/ViewMode';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { INavLink } from '../../../../enum/INavLink';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ThemeService } from '../../../../services/theme.service';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AppTheme } from '../../../../enum/AppTheme';
import { IThemeOption } from '../../../../interface/IThemeOption';
import { faArrowRightFromBracket, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../../features/auth/services/auth.service';

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
    AvatarModule,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit{

  themeService: ThemeService = inject(ThemeService);
  authService: AuthService = inject(AuthService);
  stateOptions: IThemeOption[] = [
    { label: 'Nora', value: AppTheme.NORA },
    { label: 'Aura', value: AppTheme.AURA },
    { label: 'Lara', value: AppTheme.LARA },
  ];
  navLinks: INavLink[] = [
    { path: '/home', label: 'Главная' },
    { path: '/users', label: 'Пользователи' },
    { path: '/posts', label: 'Посты' },
  ];
  viewMode: typeof ViewMode = ViewMode;
  currentView: currentView = 'date';
  currentQuantity: number = 0;
  timerValue!: string;
  companyName: string = 'РУМТИБЕТ';
  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;
  faLogoutIcon: IconDefinition = faArrowRightFromBracket;

  ngOnInit() {
    this.updateTimer();
  }

  changeCurrentView(status: currentView): void {
    this.currentView = status;
  }

  logout(): void {
    this.authService.logout();
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
