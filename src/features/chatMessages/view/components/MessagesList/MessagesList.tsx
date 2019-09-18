import * as React from 'react';
import { fold, exists, mapNullable, toUndefined } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

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
                userName={
                  pipe(
                    author,
                    fold(
                      () => UNKNOWN_USER_NAME,
                      a => `${a.name} ${a.surname}`,
                    ))}
                avatar={
                  pipe(
                    author,
                    mapNullable(a => a.avatar),
                    toUndefined,
                  )}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default MessagesList;
