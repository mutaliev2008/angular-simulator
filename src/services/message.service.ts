import { Injectable } from '@angular/core';
import { IMessage } from '../interface/IMessage';
import { Message } from '../enum/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: IMessage[] = [];

  showMessage(text: string, messageType: Message): void {
    const newId: number = Math.random();
    const content: IMessage = { id: newId, content: text, messageType: messageType };
    this.messages = [content, ...this.messages];

    setTimeout(() => {
      this.close(content);
    }, 5000);
  }

  close(message: IMessage): void {
    this.messages = this.messages.filter((msg: IMessage) => msg !== message);
  }

}
