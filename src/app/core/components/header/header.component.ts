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
import { ThemeStatus } from '../../../../enum/ThemeStatus';
import { ISatetOptions } from '../../../../interface/IStateOptions';
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

  stateOptions: ISatetOptions[] = [
    { label: 'Nora', value: ThemeStatus.NORA },
    { label: 'Aura', value: ThemeStatus.AURA },
    { label: 'Lara', value: ThemeStatus.LARA },
  ];
  navLinks: INavLink[] = [
    { path: '/', label: 'Главная' },
    { path: '/users', label: 'Пользователи' },
  ];
  value: ThemeStatus = ThemeStatus.AURA;
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
    this.themeService.colorMode$
      .pipe(
        tap((colotTheme: ThemeStatus) => {
          this.value = colotTheme;
        }),
      )
      .subscribe();
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
