import { filter, scan, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { BindAll } from 'lodash-decorators';

import { Option, none, some, getMonoid } from 'fp-ts/lib/Option';
import { getDualSemigroup } from 'fp-ts/lib/Semigroup';

import { ChatMessageEventType, ChatMessageEvent, IChatMessage, IWrittenChatMessage } from 'shared/types/models/message';

import { IMessageProvider, ProviderMessageEvent } from './namespace';

const chatMessageTypes: ChatMessageEventType[] = ['allMessages', 'newMessage', 'sendedMessage'];

@BindAll()
export class MessagesService {
  private _messages$ = new BehaviorSubject<Option<IChatMessage[]>>(none);
  public messages$ = this._messages$.asObservable();
  public messagesEvents$: Observable<ChatMessageEvent>;
  public isAvailable$: Observable<boolean>;

  constructor(private provider: IMessageProvider) {
    this.isAvailable$ = this.provider.isAvailable$;
    this.messagesEvents$ = this.provider.messages$.pipe((filter(this.isChatMessage)));
    const optionMonoid = getMonoid(getDualSemigroup<IChatMessage[]>([] as IChatMessage[]));
    this.messagesEvents$.pipe(
      map(ev => some(ev.type === 'allMessages' ? ev.payload : [ev.payload])),
      scan<Option<IChatMessage[]>>((messages, newMessages) => optionMonoid.concat(newMessages, messages), none),
    ).subscribe(m => this._messages$.next(m));
  }

  public sendMessage(newMessage: IWrittenChatMessage) {
    this.provider.sendMessage(newMessage);
  }

  private isChatMessage(ev: ProviderMessageEvent): ev is ChatMessageEvent {
    return chatMessageTypes.includes(ev.type);
  }

}
