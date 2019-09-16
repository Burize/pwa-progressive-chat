import * as React from 'react';
import { block } from 'shared/helpers/bem';
import { Avatar } from 'shared/view/elements';
import { getAcronym } from 'shared/helpers/string';

import './NavigationProfile.scss';

interface IProps {
  fullName: string;
  phone: string;
}

const b = block('navigation-profile');

export const NavigationProfile = React.memo(({ fullName, phone }: IProps) => (
  <div className={b()}>
    <div className={b('avatar')}>
      <Avatar size={64}>{getAcronym(fullName)}</Avatar>
    </div>
    <div className={b('info')}>
      <div className={b('name')}>{fullName}</div>
      <div className={b('phone')}>{phone}</div>
    </div>
  </div>
));
