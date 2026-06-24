import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  
 getItem<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    
    if (data === null) {
      return null;
    }
    return JSON.parse(data);
  }

  setItem<T>(key: string, value: T): void {
    if (typeof value === 'string') {
      localStorage.setItem(key, value);
    } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
  }

  removeItem<T>(key: string): void {
    localStorage.removeItem(key);
  }

  clear<T>(): void {
    localStorage.clear();
  }

}
