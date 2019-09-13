import { Observable } from 'rxjs';

import { ChatMessageEvent, IWrittenChatMessage } from 'shared/types/models/message';

export type ProviderMessageEvent = ChatMessageEvent | { type: any };

export interface IMessageProvider {
  messages$: Observable<ProviderMessageEvent>;
  sendMessage(newMessage: IWrittenChatMessage): void;
}
