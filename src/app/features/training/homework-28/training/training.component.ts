import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, DoCheck, inject } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-training',
  imports: [],
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss'
})
export class TrainingComponent implements DoCheck {

  count: number = 0;
  http: HttpClient = inject(HttpClient);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngDoCheck() {
    console.log('Change Detection');
  }

  changeCountScript1(): void {
    this.count++;
  }

  // Да, обновился.

  // ngDoCheck 1 раз.

  // не нужен.

  // Прозишло событие клик и после окончания Zone.js сообщил Angular

  changeCountScript2(): void {
    setTimeout(() => {
      this.count++;
    }, 1000);
  }

  
  // Да, обновился.

  // ngDoCheck 1 раз.

  // не нужен.

  // SetTimeout завершился и Zone.js сообщил Angular

  changeCountScript3(): void {
    fetch('https://dummyjson.com').then(() => this.count++);
  }

  // Да, обновился.

  // ngDoCheck 1 раз.

  // не нужен.

  // .then завершился и Zone.js сообщил Angular

  changeCountScript4(): void {
    this.http.get('https://dummyjson.com/users').pipe(
      tap(() => {
        this.count++;
      })
    ).subscribe();
  }

  
  // Да, обновился.

  // ngDoCheck 1 раз.

  // не нужен.

  // пришел ответ от http и Zone.js сообщил Angular


  changeCountScript5(): void {
    setInterval(() => {
      this.count++;
    }, 1000);
  }

  // Да, обновился.

  // ngDoCheck 1 раз.

  // не нужен.

  // после каждой секунды

  changeCountScript6(): void {
    this.changeCountScript1();
    this.changeCountScript2();
    this.changeCountScript3();
  }

  // Да, обновился.

  // ngDoCheck 2 раз.

  // не нужен.

  // после микро таски и макро таски, синхронный код поглащен микротаксой 

}

