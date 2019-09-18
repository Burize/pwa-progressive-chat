import * as React from 'react';
import { BindAll } from 'lodash-decorators';

import { fold, either } from 'fp-ts/lib/Either';
import { sequenceT } from 'fp-ts/lib/Apply';
import { pipe } from 'fp-ts/lib/pipeable';

import { block } from 'shared/helpers/bem';
import { TextInput, Button } from 'shared/view/elements';
import { withHandlers, MakeHandlersProps } from 'shared/helpers/reactive';
import { validatePassword, validatePhone } from 'shared/helpers/forms/validations';

const b = block('sign-in-form');

interface IOwnProps {
  isDisabled?: boolean;
  error?: string;
  onSubmit(phone: string, password: string): void;
}

type HandlersProps = MakeHandlersProps<'phone' | 'password'>;

const fieldNames = {
  phone: 'phone',
  password: 'password',

};

type Props = IOwnProps & HandlersProps;
@BindAll()
class SignInForm extends React.PureComponent<Props> {

  public render() {
    const { phone, password, isDisabled, error } = this.props;

    return (
      <div className={b()}>
        <form onSubmit={this.onSubmit}>
          <TextInput
            name={fieldNames.phone}
            label="Phone number"
            onChange={this.onPhoneChange}
            value={phone.value}
            validation={validatePhone}
          />
          <TextInput
            name={fieldNames.password}
            label="Password"
            type="password"
            onChange={this.onPasswordChange}
            value={password.value}
            validation={validatePassword}
          />
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            disabled={isDisabled}
            block
          >
            sign in
          </Button>
          {error}
        </form>
      </div>
    );
  }

  public onPhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.phone.setValue(e.target.value);
  }

  public onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.password.setValue(e.target.value);
  }

  public onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { phone, password, onSubmit } = this.props;

    pipe(
      sequenceT(either)(validatePhone(phone.value), validatePassword(password.value)),
      fold(
        (_) => null,
        ([phoneValue, passwordValue]) => { onSubmit(phoneValue, passwordValue); },
      ),
    );
  }
}

export default withHandlers<HandlersProps>(['phone', 'password'])(SignInForm);
