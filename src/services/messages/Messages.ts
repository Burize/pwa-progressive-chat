import { filter, startWith, scan, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BindAll } from 'lodash-decorators';

import { Option, none, some, getMonoid } from 'fp-ts/lib/Option';

import { ChatMessageEventType, ChatMessageEvent, IChatMessage, IWrittenChatMessage } from 'shared/types/models/message';

import { IMessageProvider, ProviderMessageEvent } from './namespace';
import { getDualSemigroup } from 'fp-ts/lib/Semigroup';

const chatMessageTypes: ChatMessageEventType[] = ['allMessages', 'newMessage', 'sendedMessage'];

@BindAll()
export class MessagesService {
  public messagesEvents$: Observable<ChatMessageEvent>;
  public messages$: Observable<Option<IChatMessage[]>>;
  public isAvailable$: Observable<boolean>;

  constructor(private provider: IMessageProvider) {
    this.isAvailable$ = this.provider.isAvailable$;
    this.messagesEvents$ = this.provider.messages$.pipe((filter(this.isChatMessage)));
    const optionMonoid = getMonoid(getDualSemigroup<IChatMessage[]>([] as IChatMessage[]));
    this.messages$ = this.messagesEvents$.pipe(
      map(ev => some(ev.type === 'allMessages' ? ev.payload : [ev.payload])),
      scan<Option<IChatMessage[]>>((messages, newMessages) => optionMonoid.concat(messages, newMessages), none),
      startWith(none),
    );
  }

  public sendMessage(newMessage: IWrittenChatMessage) {
    this.provider.sendMessage(newMessage);
  }

  private isChatMessage(ev: ProviderMessageEvent): ev is ChatMessageEvent {
    return chatMessageTypes.includes(ev.type);
  }

}
