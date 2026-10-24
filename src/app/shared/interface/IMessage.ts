import { Message } from '../../features/training/enum/Message';

export interface IMessage {
  id: number;
  content: string;
  messageType: Message;
}
