import { Message } from "../enum/Message";

export interface IMessage {
    id: number;
    content: string;
    messageType: Message;
}