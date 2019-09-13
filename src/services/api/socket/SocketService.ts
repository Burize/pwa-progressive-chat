import { Subject } from 'rxjs';
import { BindAll } from 'lodash-decorators';

import { IWrittenChatMessage } from 'shared/types/models/message';
import getEnvParams from 'shared/helpers/getEnvParams';

import { convertMessageByType, convertMessageToEvent } from '../converters/message';
import { SocketEvent } from './namespace';

@BindAll()
class SocketService {
  private connection: WebSocket = new WebSocket(this.connectionUrl);
  private _messages$: Subject<SocketEvent> = new Subject();
  public messages$ = this._messages$.asObservable();

  constructor(private connectionUrl: string) {
    this.connection.onmessage = this.onMessage;
  }

  public sendMessage(newMessage: IWrittenChatMessage) {
    this.connection.send(convertMessageToEvent('newMessage', newMessage));
  }

  private onMessage(ev: MessageEvent) {
    const message: string = ev.data;
    this._messages$.next(convertMessageByType(message));
  }
}

export default new SocketService(getEnvParams().wsUrl);
