import * as React from 'react';
import { block } from 'shared/helpers/bem';
import { Avatar } from 'shared/view/elements';
import { getAcronym } from 'shared/helpers/string';
import getUserAvatarPath from 'shared/helpers/getUserAvatarPath';

import './NavigationProfile.scss';

interface IProps {
  fullName: string;
  phone: string;
  avatar?: string;
}

const b = block('navigation-profile');

export const NavigationProfile = React.memo(({ fullName, phone, avatar }: IProps) => (
  <div className={b()}>
    <div className={b('avatar')}>
      <Avatar src={avatar && getUserAvatarPath(avatar)} size={64}>{getAcronym(fullName)}</Avatar>
    </div>
    <div className={b('info')}>
      <div className={b('name')}>{fullName}</div>
      <div className={b('phone')}>{phone}</div>
    </div>
  </div>
));
