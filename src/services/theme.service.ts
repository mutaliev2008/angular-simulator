import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { AppTheme } from '../enum/AppTheme';
import { usePreset } from '@primeuix/themes';
import Nora from '@primeuix/themes/nora';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import { ToggleSwitchChangeEvent } from 'primeng/toggleswitch';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private localStorage: LocalStorageService = inject(LocalStorageService);

  private colorModeSubject: BehaviorSubject<AppTheme> = new BehaviorSubject<AppTheme>(AppTheme.AURA);
  colorMode$: Observable<AppTheme> = this.colorModeSubject.asObservable();   

  private darkThemeActiveSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getSavedTheme());
  darkThemeActive$: Observable<boolean> = this.darkThemeActiveSubject.asObservable().pipe(
    tap((isDark: boolean) => {
      const element: HTMLElement = document.documentElement;
      if (isDark) {
        element.classList.add('my-app-dark');
      } else {
        element.classList.remove('my-app-dark');
      }
    }),
  );

  constructor() {
    this.checkColorStorage();
  }

  checkColorStorage(): void {
    const savedState: AppTheme = localStorage.getItem('color') as AppTheme;
  
    if (savedState && Object.values(AppTheme).includes(savedState)) {
      this.applyTheme(savedState);
    } else {
      this.colorModeSubject.next(AppTheme.AURA);
    }
  }
  
  applyTheme(color: AppTheme): void {
    this.colorModeSubject.next(color);
    this.localStorage.setItem('color', color);
    switch (color) {
      case AppTheme.AURA:
        usePreset(Aura);
        break;
      case AppTheme.LARA:
        usePreset(Lara);
        break;
      case AppTheme.NORA:
        usePreset(Nora);
        break;
    }
  }

  getSavedTheme(): boolean {
    const localData: string | null = this.localStorage.getItem('theme');
    const theme: boolean = localData? JSON.parse(localData) : false;
    return theme;
  }

  changeTheme(event: ToggleSwitchChangeEvent): void {
    this.darkThemeActiveSubject.next(event.checked);
    this.localStorage.setItem('theme', event.checked);
  }

}
