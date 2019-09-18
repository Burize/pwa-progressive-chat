import * as React from 'react';
import { BindAll } from 'lodash-decorators';
import { filter } from 'rxjs/operators';
import { Option, isNone } from 'fp-ts/lib/Option';
import { isPending, isFailure } from '@devexperts/remote-data-ts';

import { IUpdateUserFields } from 'services/api/models/user';
import { userService } from 'services/user';
import { UpdatingUser } from 'features/manageProfile/namespace';
import { withReactive, Observify } from 'shared/helpers/reactive';
import { IUser } from 'shared/types/models/user';
import { Spinner, message } from 'shared/view/elements';
import { block } from 'shared/helpers/bem';
import { Base64 } from 'shared/types/file';

import { ProfileOverview, EditableFields } from '../../components';
import { actions } from '../../../reactive';

import './ProfileSettings.scss';

const b = block('profile-settings');

interface IReactiveProps {
  user: Option<IUser>;
  updatingUser: UpdatingUser;
  updateUser(updatedFields: IUpdateUserFields): void;
  updateAvatar(avatar: Base64): void;
}

type Props = IReactiveProps;

@BindAll()
class ProfileSettings extends React.PureComponent<Props> {

  public render() {
    const { user, updatingUser } = this.props;

    if (isNone(user)) {
      return <div className={b('error')}>Empty user</div>;
    }

    return (
      <div className={b()}>
        <ProfileOverview user={user.value} />
        <Spinner spinning={isPending(updatingUser)} >
          <EditableFields
            user={user.value}
            onUpdatePhone={this.updatePhone}
            onUpdateName={this.updateName}
            onUpdateAvatar={this.updateAvatar}
          />
        </Spinner>
      </div>
    );
  }

  private updatePhone(phone: string) {
    this.props.updateUser({ phone });
  }

  private updateName(name: string, surname: string) {
    this.props.updateUser({ name, surname });
  }

  private updateAvatar(avatar: Base64) {
    this.props.updateAvatar(avatar);
  }
}

const mapPropsToRx = (): Observify<IReactiveProps> => {

  actions.updatingUser$.pipe(
    filter(isFailure),
  ).subscribe(updatingUser => {
    message.error(updatingUser.error);
  });

  return {
    updateUser: actions.update,
    updateAvatar: actions.uploadAvatar,
    user: userService.user$,
    updatingUser: actions.updatingUser$,
  };
};

export default withReactive(ProfileSettings)(mapPropsToRx);
