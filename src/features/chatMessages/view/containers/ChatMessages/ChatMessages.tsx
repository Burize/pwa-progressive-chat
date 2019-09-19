import * as React from 'react';
import { BindAll } from 'lodash-decorators';
import { Option, fold, isSome, isNone } from 'fp-ts/lib/Option';
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
const LIST_DOM_ELEMENT_ID = 'chatMessagesList';

interface IReactiveProps {
  user: Option<IUser>;
  messages: Option<IMessageWithAuthor[]>;
  isCanSendMessage: boolean;
  sendMessage(message: IWrittenChatMessage): void;
}

type Props = IReactiveProps;
@BindAll()
class ChatMessages extends React.PureComponent<Props> {
  public componentDidMount() {
    if (isSome(this.props.messages)) {
      scrollToBottom(LIST_DOM_ELEMENT_ID);
    }
  }

  public componentDidUpdate(prevProps: Props) {
    const { messages } = this.props;
    if (isSome(messages) && isNone(prevProps.messages)) {
      scrollToBottom(LIST_DOM_ELEMENT_ID);
    }
  }

  public render() {
    const { messages, user, isCanSendMessage } = this.props;

    if (isNone(user)) {
      return <div className={b('error')}>Empty user when loading messages</div>;
    }
    return (
      <div className={b()}>
        {
          pipe(
            messages,
            fold(
              () => <Spinner className={b('loader')} />,
              m =>
                <div className={b('messages')} id={LIST_DOM_ELEMENT_ID}>
                  <MessagesList
                    messages={m}
                    user={user.value}
                  />
                </div>,
            ),
          )}
        <MessageInput disabled={!isCanSendMessage} onSendMessage={this.sendMessage} />
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
  return {
    user: userService.user$,
    messages: actions.messageWithMembers$,
    isCanSendMessage: messagesService.isAvailable$,
    sendMessage: messagesService.sendMessage,
  };
};

export default withReactive(ChatMessages)(mapPropsToRx);
