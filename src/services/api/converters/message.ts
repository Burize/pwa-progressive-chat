import { IChatMessage, IWrittenChatMessage } from 'shared/types/models/message';

import { SocketEvent, SocketEventType } from '../socket/namespace';
import { IServerChatMessage, ServerSocketEventType, ServerSocketMessage } from '../models/message';

export function convertMessageByType(jsonMessage: string): SocketEvent {
  const message: ServerSocketMessage = JSON.parse(jsonMessage);

  const converter = converterByType[message.type];

  if (!converter) {
    throw Error('unknown socket message type');
  }

  return { type: messageTypeMap[message.type], payload: converter(message.payload) };
}

const converterByType: Record<ServerSocketEventType, Function> = {
  'all_messages': convertAllMessages,
  'new_message': convertServerMessage,
  'sended_message': convertServerMessage,
};

function convertAllMessages(messages: IServerChatMessage[]): IChatMessage[] {
  return messages.map(convertServerMessage);
}

function convertServerMessage(message: IServerChatMessage): IChatMessage {
  const { id, userId, body, createdAt } = message;
  return {
    id,
    createdAt,
    body,
    userId,
  };
}

const messageTypeMap: Record<ServerSocketEventType, SocketEventType> = {
  'all_messages': 'allMessages',
  'new_message': 'newMessage',
  'sended_message': 'sendedMessage',
};

export function convertMessageToEvent(type: SocketEventType, message: IWrittenChatMessage) {
  return JSON.stringify({ type: messageEventTypeMap[type], payload: message });
}

const messageEventTypeMap: Record<SocketEventType, ServerSocketEventType> = {
  'allMessages': 'all_messages',
  'newMessage': 'new_message',
  'sendedMessage': 'sended_message',
};
