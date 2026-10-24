import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { IUser } from '../IUser';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss'
})
export class ParentComponent {

  user: IUser = {
    name: 'Alex',
    age: 20
  };
  count = 0

  changeName(): void {
    // this.user.name = 'Eugene';
    // Изменений не просиходит так как статегия onPush не реагирует на изменения содержимого, а лишь на изменение ссылки.
    // Ниже мы обновляем не содержимое, а саму ссылку.
    this.count++
  }
  
}
