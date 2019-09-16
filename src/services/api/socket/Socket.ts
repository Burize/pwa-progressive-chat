import { Subject, BehaviorSubject } from 'rxjs';
import { BindAll } from 'lodash-decorators';
import { distinct } from 'rxjs/operators';

import { IWrittenChatMessage } from 'shared/types/models/message';

import { convertMessageByType, convertMessageToEvent } from '../converters/message';
import { SocketEvent } from './namespace';

@BindAll()
export default class Socket {
  protected connection: WebSocket | null = null; // protected need for isInitialized type guard
  private initializing: Promise<{}> | null = null;
  private _messages$: Subject<SocketEvent> = new Subject();
  public messages$ = this._messages$.asObservable();
  private _isAvailable$: Subject<boolean> = new BehaviorSubject(false);
  public isAvailable$ = this._isAvailable$.asObservable().pipe(distinct());

  constructor(private connectionUrl: string) { }

  private isInitialized(): this is { connection: WebSocket } {
    return this.connection !== null && this.connection.readyState === WebSocket.OPEN;
  }

  public async initialize() {
    if (this.initializing) {
      return this.initializing;
    }

    this.connect();
    return this.initializing;
  }

  private connect() {
    const connection = new WebSocket(this.connectionUrl);
    connection.onmessage = this.onMessage;
    this.initializing = new Promise((resolve, reject) => {
      connection.onopen = this.makeOpenConnectionHandler(resolve);
      connection.onclose = this.makeCloseConnectionHandler(reject);
    });
    this.initializing.catch(e => {
      console.error(e);
    });
    this.connection = connection;
  }

  public async sendMessage(newMessage: IWrittenChatMessage) {
    await this.initializing;
    if (!this.isInitialized()) {
      return;
    }
    this.connection.send(convertMessageToEvent('newMessage', newMessage));
  }

  private onMessage(ev: MessageEvent) {
    const message: string = ev.data;
    this._messages$.next(convertMessageByType(message));
  }

  private makeOpenConnectionHandler(resolveInitialize: () => void) {
    return () => {
      this._isAvailable$.next(true);
      resolveInitialize();
    };
  }

  private makeCloseConnectionHandler(rejectInitialize: (error?: string) => void) {
    return (ev: CloseEvent) => {
      this._isAvailable$.next(false);

      if (ev.wasClean) {
        this.initializing = null;
        return;
      }

      setTimeout(() => {
        rejectInitialize(`Socket's connection  error: ${this.connectionUrl}`);
        this.connect();
      }, 3000);
    };
  }
}
