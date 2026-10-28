import { Component, inject, OnInit } from '@angular/core';
import { ViewMode } from '../../../features/training/enum/ViewMode';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { INavLink } from '../../../features/training/enum/INavLink';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AppTheme } from '../../../features/training/enum/AppTheme';
import { IThemeOption } from '../../../features/home/interface/IThemeOption';
import { faArrowRightFromBracket, faCartShopping, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../../../core/services/auth.service';
import { IAppConfig } from '../../../core/interface/IAppConfig';
import { CartService } from '../../../features/cart/services/cart.service';
import { APP_CONFIG } from '../../../core/tokens/app-configuration.token';

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
    AsyncPipe,
    DatePipe,
    ButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  config: IAppConfig = inject(APP_CONFIG); 
  themeService: ThemeService = inject(ThemeService);
  authService: AuthService = inject(AuthService);
  cartService: CartService = inject(CartService);
  stateOptions: IThemeOption[] = [
    { label: 'Nora', value: AppTheme.NORA },
    { label: 'Aura', value: AppTheme.AURA },
    { label: 'Lara', value: AppTheme.LARA }
  ];

  navLinks: INavLink[] = [
    { path: '/home', label: 'Главная' },
    { path: '/users', label: 'Пользователи' },
    { path: '/posts', label: 'Посты' },
    { path: '/products', label: 'Продукты' },
    { path: '/recipes', label: 'Рецепты' },
    { path: '/quotes', label: 'Цитаты' }
  ];

  viewMode: typeof ViewMode = ViewMode;
  currentView: currentView = 'date';
  currentQuantity: number = 0;
  timerValue: Date = new Date;
  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;
  faLogoutIcon: IconDefinition = faArrowRightFromBracket;
  faCartIcon: IconDefinition = faCartShopping;

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
      this.timerValue = new Date();
    }, 1000);
  }

}
