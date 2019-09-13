import { filter, startWith, scan, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BindAll } from 'lodash-decorators';

import { ChatMessageEventType, ChatMessageEvent, IChatMessage, IWrittenChatMessage } from 'shared/types/models/message';

import { IMessageProvider, ProviderMessageEvent } from './namespace';

const chatMessageTypes: ChatMessageEventType[] = ['allMessages', 'newMessage', 'sendedMessage'];

@BindAll()
export class MessagesService {
  public messagesEvents$: Observable<ChatMessageEvent>;
  public messages$: Observable<IChatMessage[]>;

  constructor(private provider: IMessageProvider) {
    this.messagesEvents$ = this.provider.messages$.pipe((filter(this.isChatMessage)));

    this.messages$ = this.messagesEvents$.pipe(
      map(ev => ev.type === 'allMessages' ? ev.payload : [ev.payload]),
      scan<IChatMessage[]>((messages, newMessages) => messages.concat(newMessages), []),
      startWith([]),
    );
  }

  public sendMessage(newMessage: IWrittenChatMessage) {
    this.provider.sendMessage(newMessage);
  }

  private isChatMessage(ev: ProviderMessageEvent): ev is ChatMessageEvent {
    return chatMessageTypes.includes(ev.type);
  }

}
