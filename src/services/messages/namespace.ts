import { Observable } from 'rxjs';

import { ChatMessageEvent, IWrittenChatMessage } from 'shared/types/models/message';

export type ProviderMessageEvent = ChatMessageEvent | { type: any };

export interface IMessageProvider {
  isAvailable$: Observable<boolean>;
  messages$: Observable<ProviderMessageEvent>;
  sendMessage(newMessage: IWrittenChatMessage): void;
}
