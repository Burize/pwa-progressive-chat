import * as React from 'react';

import { IUser } from 'shared/types/models/user';
import { block } from 'shared/helpers/bem';
import { Avatar } from 'shared/view/elements';
import getUserAvatarPath from 'shared/helpers/getUserAvatarPath';

const b = block('profile-overview');

import './ProfileOverview.scss';

interface IProps {
  user: IUser;
}

export default class ProfileOverview extends React.PureComponent<IProps> {
  public render() {
    const { user } = this.props;
    return (
      <div className={b()}>
        <Avatar src={getUserAvatarPath(user.avatar)} size={96} className={b('avatar')}>DK</Avatar>
        <div className={b('basic-information')}>
          <div className={b('name')}>{user.name}</div>
          <div className={b('surname')}>{user.surname}</div>
        </div>
      </div>
    );
  }
}
