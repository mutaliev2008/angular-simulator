import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

enum Color {
  NORA = 'Nora',
  AURA = 'Aura', 
  LARA = 'Lara'
}

enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private localStorage: LocalStorageService = inject(LocalStorageService)
  private darkThemeActiveSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private colorModeSubject: BehaviorSubject<Color> = new BehaviorSubject<Color>(this.localStorage.getItem('color') ?? Color.AURA);

  darkThemeActive$: Observable<boolean> = this.darkThemeActiveSubject.asObservable().pipe(
    
  )
  colorMode$: Observable<Color> = this.colorModeSubject.asObservable();

  chageColor(color: Color): void {
    this.colorModeSubject.next(color)
    this.localStorage.setItem('color', color)
  }

  changeTheme() {
 

    this.darkThemeActiveSubject.next(!this.darkThemeActiveSubject.value)
    this.localStorage.setItem('theme', !this.darkThemeActiveSubject.value)
}

}
