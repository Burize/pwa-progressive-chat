import * as React from 'react';
import { fold, exists } from 'fp-ts/lib/Option';

import { IMember, IUser } from 'shared/types/models/user';
import { block } from 'shared/helpers/bem';

import { IMessageWithAuthor } from '../../../namespace';
import { Message } from '../Message/Message';

import './MessagesList.scss';

const UNKNOWN_USER_NAME = 'Unknown user';

const b = block('messages-list');

interface IOwnProps {
  messages: IMessageWithAuthor[];
  user: IUser;
}

type Props = IOwnProps;

class MessagesList extends React.PureComponent<Props> {

  public render() {
    const { messages, user } = this.props;
    return (
      <div className={b()}>
        {messages.map(({ message, author }) => {
          const isOwnMessage = exists<IMember>(a => a.id === user.id)(author);
          return (
            <div className={b('message', { ['is-own']: isOwnMessage })} key={message.id}>
              <Message
                message={message}
                isOwnMessage={isOwnMessage}
                userName={fold<IMember, string>(
                  () => UNKNOWN_USER_NAME,
                  a => `${a.name} ${a.surname}`,
                )(author)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default MessagesList;
