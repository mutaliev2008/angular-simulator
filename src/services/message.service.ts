import { Injectable } from '@angular/core';
import { IMessage } from '../interface/IMessage';
import { Message } from '../enum/Message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: IMessage[] = [];

  showWarn(text: string, messageType: Message.WARN): void {
    this.showMessage(text, messageType);
  }

  showError(text: string, messageType: Message.ERROR): void {
    this.showMessage(text, messageType);
  }

  showSuccess(text: string, messageType: Message.SUCCESS): void {
    this.showMessage(text, messageType);
  }

  showInfo(text: string, messageType: Message.INFO): void {
    this.showMessage(text, messageType);
  }

  close(message: IMessage): void {
    this.messages = this.messages.filter((msg: IMessage) => msg !== message);
  }

  private showMessage(text: string, messageType: Message): void {
    const newId: number = Math.random();
    const content: IMessage = { id: newId, content: text, messageType: messageType };
    this.messages = [content, ...this.messages];

    setTimeout(() => {
      this.close(content);
    }, 5000);
  }
  
}
