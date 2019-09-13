import { UserId } from './user';

export type MessageId = string;

export interface IChatMessage {
  id: MessageId;
  userId: UserId;
  body: string;
  createdAt: number;
}

export type IWrittenChatMessage = Pick<IChatMessage, 'userId' | 'body'>;

export type ChatMessageEventType = 'allMessages' | 'newMessage' | 'sendedMessage';

export interface IChatMessageEvent<T extends ChatMessageEventType, P> {
  type: T;
  payload: P;
}

export interface IAllMessages extends IChatMessageEvent<'allMessages', IChatMessage[]> { }

export interface INewMessage extends IChatMessageEvent<'newMessage', IChatMessage> { }

export interface ISendedMessage extends IChatMessageEvent<'sendedMessage', IChatMessage> { }

export type ChatMessageEvent = IAllMessages | INewMessage | ISendedMessage;
