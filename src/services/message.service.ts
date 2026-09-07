import { Injectable } from '@angular/core';
import { IMessage } from '../interface/IMessage';
import { Message } from '../enum/Message';
import { BehaviorSubject, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {

  private messageSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  message$: Observable<IMessage[]> = this.messageSubject.asObservable();

  showWarn(text: string): void {
    this.showMessage(text, Message.WARN);
  }

  showError(text: string): void {
    this.showMessage(text, Message.ERROR);
  }

  showSuccess(text: string): void {
    this.showMessage(text, Message.SUCCESS);
  }

  showInfo(text: string): void {
    this.showMessage(text, Message.INFO);
  }

  close(message: IMessage): void {
    const current: IMessage[] = this.messageSubject.value;
    this.messageSubject.next(
      current.filter((msg: IMessage) =>  msg !== message)
    );
  }

  private showMessage(text: string, messageType: Message): void {
    const newId: number = Math.random();
    const content: IMessage = { id: newId, content: text, messageType: messageType };
    this.messageSubject.next([content, ...this.messageSubject.value]);

    setTimeout(() => {
      this.close(content);
    }, 5000);
  }
  
}
