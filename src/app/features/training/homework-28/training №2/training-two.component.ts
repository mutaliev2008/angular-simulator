import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, inject } from '@angular/core';

@Component({
  selector: 'app-training-two',
  imports: [],
  templateUrl: './training-two.component.html',
  styleUrl: './training-two.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingTwoComponent implements DoCheck {

  count: number = 0;
  http: HttpClient = inject(HttpClient);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngDoCheck() {
    console.log('Change Detection');
  }

  changeCountScript1(): void {
    setTimeout(() => {
      this.count++;
      this.cdr.markForCheck();
    }, 500);
    this.count++
  }

  // 1. Компонент помечен что его нужно проверить при следующем CD
  // 2. нет так как он лишь помечен проверки не было, только при след. CD(после завершнеия setTimeout)
  // 3. После асинхронной операции setTimeout произойдет еще один цикл так как после заверщения мы его пометили для проверки 
  // 4. так как стратегия onPush не реагирует на асинхронные изменения без пометок

  changeCountScript2(): void {
    setTimeout(() => {
      this.count++;
      this.cdr.detectChanges();
    }, 500);
  }
  
  // 1. CD срабатывает 3 раза, после click, ручного вызова и после setTimeout 
  // 2. Да синхронно при вызове
  // 3. этот и его дочерние если есть
  // 4. Если нужно моментальная проверка и просто метки не достаточно(обычно во внешних библеотеках)


  changeCountScript3(): void {
    this.cdr.detach();

    setTimeout(() => {
      this.count++;
      this.cdr.detach();
    }, 500);

    setInterval(() => {
      this.count++;
    }, 1000);

    this.count++;

    fetch('https://dummyjson.com').then(() => this.count++);
  }


  // 1. Нет компонент исключен из автоматической проверки
  // 2. нет
  // 3. компонент и его потомки отключены от дерева-CD и не проверяются
  // 4. все кроме detectChanges

  changeCountScript4(): void {
    this.cdr.reattach();
  }

  // 1. компонент вернули в дерево и теперь будет проверяться как обычно
  // 2. при выозове reattach(добавлении его в DOM)
  // 3. нет, не обязательно все работет как прежде

}

