import * as React from 'react';

import { formatMessageCreationDate } from 'shared/helpers/date';
import { IChatMessage } from 'shared/types/models/message';
import { block } from 'shared/helpers/bem';
import { Avatar } from 'shared/view/elements';
import { getAcronym } from 'shared/helpers/string';
import getUserAvatarPath from 'shared/helpers/getUserAvatarPath';

import './Message.scss';

interface IProps {
  message: IChatMessage;
  userName: string;
  isOwnMessage: boolean;
  avatar?: string;
}

const b = block('chat-message');

export const Message = React.memo((props: IProps) => {
  const { userName, message: { body, createdAt }, avatar, isOwnMessage } = props;
  return (
    <div className={b({ ['is-own']: isOwnMessage })}>
      {!isOwnMessage &&
        <div className={b('avatar')}>
          <Avatar src={avatar && getUserAvatarPath(avatar)} size={48}>{getAcronym(userName)}</Avatar>
        </div>}
      <div className={b('content')}>
        <div className={b('user')}>{userName}</div>
        <div className={b('body')}>{body}</div>
        <div className={b('created-at')}>{formatMessageCreationDate(createdAt)}</div>
      </div>
    </div>
  );
});
