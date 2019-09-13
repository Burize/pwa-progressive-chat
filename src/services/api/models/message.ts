import { UserId } from 'shared/types/models/user';
import { MessageId } from 'shared/types/models/message';

export type ServerSocketEventType = 'all_messages' | 'new_message' | 'sended_message';

export interface IServerChatMessage {
  id: MessageId;
  userId: UserId;
  body: string;
  createdAt: number;
}

export interface IServerSocketEvent<T extends ServerSocketEventType, P> {
  type: T;
  payload: P;
}

interface IAllMessages extends IServerSocketEvent<'all_messages', IServerChatMessage[]> { }

interface INewMessage extends IServerSocketEvent<'new_message', IServerChatMessage> { }

interface ISendedMessages extends IServerSocketEvent<'sended_message', IServerChatMessage> { }

export type ServerSocketMessage = IAllMessages | INewMessage | ISendedMessages;
