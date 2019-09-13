import { ChatMessageEventType, ChatMessageEvent } from 'shared/types/models/message';

export type SocketEventType = ChatMessageEventType;

export interface ISocketEvent<T extends SocketEventType, P> {
  type: T;
  payload: P;
}

export type SocketEvent = ChatMessageEvent;
