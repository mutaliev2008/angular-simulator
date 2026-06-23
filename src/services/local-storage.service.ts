import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService<T> {
  
  getItem(key: string): T {
    return localStorage.getItem(key) as T;
  }

  setItem(key: string, value: T): void {
    localStorage.setItem(key, String(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

}
