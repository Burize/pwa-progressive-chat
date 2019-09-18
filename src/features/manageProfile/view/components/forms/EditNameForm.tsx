import * as React from 'react';
import { BindAll } from 'lodash-decorators';
import { sequenceT } from 'fp-ts/lib/Apply';
import { fold, either } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';

import { Modal, TextInput, Button } from 'shared/view/elements';
import { MakeHandlersProps, withHandlers } from 'shared/helpers/reactive';
import { validateName } from 'shared/helpers/forms/validations';

type IHandlersProps = MakeHandlersProps<'name' | 'surname'>;

interface IOwnProps {
  visible: boolean;
  currentName: string;
  currentSurname: string;
  onCancel(): void;
  onSubmit(name: string, surname: string): void;
}

type IProps = IOwnProps & IHandlersProps;

@BindAll()
class EditNameForm extends React.PureComponent<IProps> {

  public componentDidUpdate(prevProps: IProps) {
    const { name, surname, currentName, currentSurname } = this.props;

    if (this.props.visible && !prevProps.visible) {
      name.setValue(currentName);
      surname.setValue(currentSurname);
    }
  }

  public render() {
    const { visible, name, surname, onCancel } = this.props;
    return (
      <Modal
        title="User name"
        centered
        visible={visible}
        onCancel={onCancel}
        footer={[
          <Button key="back" type="primary" onClick={onCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={this.submit}>
            Submit
          </Button>,
        ]}
      >
        <TextInput
          label="Name"
          onChange={this.onNameChange}
          value={name.value}
          validation={validateName}
        />
        <TextInput
          label="Surname"
          onChange={this.onSurnameChange}
          value={surname.value}
          validation={validateName}
        />
      </Modal>
    );
  }

  public onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.name.setValue(e.target.value);
  }

  public onSurnameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.name.setValue(e.target.value);
  }

  public submit() {
    const { name, surname, onSubmit } = this.props;

    pipe(
      sequenceT(either)(
        validateName(name.value),
        validateName(surname.value),
      ),
      fold(
        (_) => null,
        ([nameValue, surnameValue]) => {
          onSubmit(nameValue, surnameValue);
        },
      ),
    );
  }
}

export default withHandlers<IHandlersProps>(['name', 'surname'])(EditNameForm);
