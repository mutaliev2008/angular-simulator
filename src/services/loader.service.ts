import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  showLoader(): void {
    this.isLoadingSubject.next(
      true
    )
      document.body.style.overflow = 'hidden';
  }

  hideLoader(): void {
    this.isLoadingSubject.next(
      false
    )
      document.body.style.overflow = '';
  }
  
}
