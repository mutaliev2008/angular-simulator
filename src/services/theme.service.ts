import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { ThemeStatus } from '../enum/ThemeStatus';
import { BaseDesignTokens, Preset, usePreset } from '@primeuix/themes';
import Nora from '@primeuix/themes/nora';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private localStorage: LocalStorageService = inject(LocalStorageService);
  private darkThemeActiveSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private colorModeSubject: BehaviorSubject<ThemeStatus> = new BehaviorSubject<ThemeStatus>(ThemeStatus.AURA);

  colorMode$: Observable<ThemeStatus> = this.colorModeSubject.asObservable();
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
    this.darkThemeActiveSubject.next(localStorage.getItem('theme') === 'true');
    this.checkColorStorage();
  }

  checkColorStorage(): void {
    const savedState: ThemeStatus = localStorage.getItem('color') as ThemeStatus;
  
    if (savedState && Object.values(ThemeStatus).includes(savedState)) {
      this.applyTheme(savedState);
    } else {
      this.colorModeSubject.next(ThemeStatus.AURA);
    }
  }
  
  applyTheme(color: ThemeStatus): void {
    this.colorModeSubject.next(color);
    this.localStorage.setItem('color', color);
    switch (color) {
      case ThemeStatus.AURA:
        usePreset(Aura);
        break;
      case ThemeStatus.LARA:
        usePreset(Lara);
        break;
      case ThemeStatus.NORA:
        usePreset(Nora);
        break;
    }
  }

  changeTheme(): void {
    const newValue: boolean = !this.darkThemeActiveSubject.value;
    this.darkThemeActiveSubject.next(newValue);
    this.localStorage.setItem('theme', newValue);
  }

}
