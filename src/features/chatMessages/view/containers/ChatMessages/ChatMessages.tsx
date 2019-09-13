import * as React from 'react';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BindAll } from 'lodash-decorators';
import { fromNullable, Option, fold } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

import { messagesService } from 'services/messages';
import { userService } from 'services/user';
import { withReactive, Observify } from 'shared/helpers/reactive';
import { IWrittenChatMessage } from 'shared/types/models/message';
import { IUser } from 'shared/types/models/user';
import { Spinner } from 'shared/view/elements';
import { block } from 'shared/helpers/bem';
import { scrollToBottom } from 'shared/helpers/dom';

import { MessagesList, MessageInput } from '../../components';
import { actions } from '../../../reactive';
import { IMessageWithAuthor } from '../../../namespace';

import './ChatMessages.scss';

const b = block('chat-messages');
const LIST_DIV_ID = 'chatMessagesList';

interface IReactiveProps {
  user: Option<IUser>;
  messages: IMessageWithAuthor[];
  sendMessage(message: IWrittenChatMessage): void;
}

type Props = IReactiveProps;
@BindAll()
class ChatMessages extends React.PureComponent<Props> {
  public componentDidUpdate(prevProps: Props) {
    if (this.props.messages.length !== 0 && prevProps.messages.length === 0) {
      scrollToBottom(LIST_DIV_ID);
    }
  }

  public render() {
    const { messages, user } = this.props;
    return (
      <div className={b()}>
        {fold<IUser, React.ReactElement>(
          () => <Spinner />,
          u =>
            <div className={b('messages')} id={LIST_DIV_ID}>
              <MessagesList
                messages={messages}
                user={u}
              />
            </div>,
        )(user)}
        <MessageInput onSendMessage={this.sendMessage} />
      </div>
    );
  }

  public sendMessage(message: string) {
    const { user, sendMessage } = this.props;
    pipe(
      user,
      fold(() => null, (u) => sendMessage({ userId: u.id, body: message })),
    );
  }
}

const mapPropsToRx = (): Observify<IReactiveProps> => {

  messagesService.messagesEvents$.pipe(
    map(ev => ev.type === 'allMessages' ? ev.payload.map(m => m.userId) : [ev.payload.userId]),
  ).subscribe(authorIds => actions.loadMembers(authorIds));

  const messageWithMembers$: Observable<IMessageWithAuthor[]> =
    combineLatest(messagesService.messages$, actions.members$).pipe(
      map(([messages, members]) => messages.map(message => (
        {
          message,
          author: fromNullable(members.find(member => member.id === message.userId)),
        })),
      ),
    );

  return {
    user: userService.user$,
    messages: messageWithMembers$,
    sendMessage: messagesService.sendMessage,
  };
};

export default withReactive(ChatMessages)(mapPropsToRx);
