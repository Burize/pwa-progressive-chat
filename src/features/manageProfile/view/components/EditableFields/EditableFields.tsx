import * as React from 'react';
import { BindAll } from 'lodash-decorators';

import { withHandlers, MakeHandlersProps } from 'shared/helpers/reactive';
import { IUser } from 'shared/types/models/user';
import { block } from 'shared/helpers/bem';
import { loadFiles } from 'services/files';
import { IFile, Base64 } from 'shared/types/file';
import { message } from 'shared/view/elements';

import { ProfileField } from './ProfileField/ProfileField';
import { EditPhoneForm, EditNameForm } from '../forms';
import { EditableField } from '../../../namespace';

const b = block('editable-fields');

import './EditableFields.scss';

type IHandlersProps = MakeHandlersProps<'selectedField'>;

interface IOwnProps {
  user: IUser;
  onUpdatePhone(phone: string): void;
  onUpdateName(name: string, surname: string): void;
  onUpdateAvatar(avatar: Base64): void;
}

type Props = IOwnProps & IHandlersProps;
@BindAll()
class EditableFields extends React.PureComponent<Props> {
  public render() {
    const { user, selectedField } = this.props;
    return (
      <div className={b()}>
        <ProfileField
          type="phone"
          icon="phone"
          value={user.phone}
          description="Phone number"
          onSelect={this.onEdit}
        />
        <ProfileField
          type="name"
          icon="user"
          value={`${user.name} ${user.surname}`}
          description="User name"
          onSelect={this.onEdit}
        />
        <ProfileField
          type="avatar"
          icon="camera"
          value="User avatar"
          description="Press to change avatar"
          onSelect={this.onEdit}
        />
        <EditPhoneForm
          visible={selectedField.value === 'phone'}
          currentPhone={user.phone}
          onCancel={this.closeEditForm}
          onSubmit={this.updatePhone}
        />

        <EditNameForm
          visible={selectedField.value === 'name'}
          currentName={user.name}
          currentSurname={user.surname}
          onCancel={this.closeEditForm}
          onSubmit={this.updateName}
        />
      </div>
    );
  }

  private onEdit(fieldType: EditableField) {
    if (fieldType === 'avatar') {
      loadFiles({
        acceptFileTypes: ['png', 'jpg'],
        onUploadSuccess: this.updateAvatar,
        onChooseWrongFileType: this.showWrongImageFormatError,
      });
      return;
    }
    this.props.selectedField.setValue(fieldType);
  }

  private updatePhone(phone: string) {
    const { selectedField, onUpdatePhone } = this.props;
    selectedField.setValue('');
    onUpdatePhone(phone);
  }

  private updateName(name: string, surname: string) {
    const { selectedField, onUpdateName } = this.props;
    selectedField.setValue('');
    onUpdateName(name, surname);
  }

  private closeEditForm() {
    this.props.selectedField.setValue('');
  }

  private updateAvatar(avatar: IFile) {
    this.props.onUpdateAvatar(avatar.dataUrl);
  }

  private showWrongImageFormatError() {
    message.error('Wrong image format');
  }
}

export default withHandlers<IHandlersProps>(['selectedField'])(EditableFields);
