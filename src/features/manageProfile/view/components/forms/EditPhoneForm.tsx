import * as React from 'react';
import { BindAll } from 'lodash-decorators';
import { sequenceT } from 'fp-ts/lib/Apply';
import { fold, either } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';

import { Modal, TextInput, Button } from 'shared/view/elements';
import { MakeHandlersProps, withHandlers } from 'shared/helpers/reactive';
import { validatePhone } from 'shared/helpers/forms/validations';

type IHandlersProps = MakeHandlersProps<'phone'>;

interface IOwnProps {
  visible: boolean;
  currentPhone: string;
  onCancel(): void;
  onSubmit(phone: string): void;
}
type IProps = IOwnProps & IHandlersProps;

@BindAll()
class EditPhoneForm extends React.PureComponent<IProps> {

  public componentDidUpdate(prevProps: IProps) {
    const { phone, currentPhone } = this.props;

    if (this.props.visible && !prevProps.visible) {
      phone.setValue(currentPhone);
    }
  }

  public render() {
    const { visible, phone, onCancel } = this.props;
    return (
      <Modal
        title="Phone number"
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
          label="Phone number"
          onChange={this.onPhoneChange}
          value={phone.value}
          validation={validatePhone}
        />
      </Modal>
    );
  }

  public onPhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.phone.setValue(e.target.value);
  }

  public submit() {
    const { phone, onSubmit } = this.props;

    pipe(
      sequenceT(either)(
        validatePhone(phone.value),
      ),
      fold(
        (_) => null,
        ([phoneValue]) => {
          onSubmit(phoneValue);
        },
      ),
    );
  }
}

export default withHandlers<IHandlersProps>(['phone'])(EditPhoneForm);
