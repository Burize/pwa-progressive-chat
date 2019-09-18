import * as React from 'react';

import { EditableField } from 'features/manageProfile/namespace';
import { block } from 'shared/helpers/bem';
import { Icon } from 'shared/view/elements';

const b = block('profile-field');

import './ProfileField.scss';

interface IProps {
  type: EditableField;
  icon: string;
  value: string;
  description: string;
  onSelect(fieldType: EditableField): void;
}

export const ProfileField = React.memo((props: IProps) => {
  const { icon, value, description, onSelect, type } = props;

  const onClick = React.useCallback(() => onSelect(type), [onSelect, type]);
  return (
    <div className={b()} onClick={onClick}>
      <Icon className={b('icon')} type={icon} />
      <div className={b('body')}>
        <div className={b('value')}>{value}</div>
        <div className={b('description')}>{description}</div>
      </div>
    </div>
  );
});
