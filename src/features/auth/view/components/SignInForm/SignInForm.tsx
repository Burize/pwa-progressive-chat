import * as React from 'react';
import { block } from 'shared/helpers/bem';
import { TextInput, Button } from 'shared/view/elements';
import { withHandlers, IChangeHandler } from 'shared/helpers/reactive/withHandlers';
import { BindAll } from 'lodash-decorators';

import { array, snoc, lefts, isNonEmpty } from 'fp-ts/lib/Array';

import { validatePassword, validatePhone } from 'shared/helpers/forms/validations';

const b = block('sign-in-form');

type HandlersProps = {
  phone: IChangeHandler;
  password: IChangeHandler;
};

const fieldNames = {
  phone: 'phone',
  password: 'password',

};

type Props = HandlersProps;
@BindAll()
class SignInForm extends React.PureComponent<Props> {

  public render() {
    const { phone, password } = this.props;

    return (
      <div className={b()}>
        <form onSubmit={this.onSubmit}>
          <TextInput
            name={fieldNames.phone}
            onChange={this.onPhoneChange}
            value={phone.value}
            validation={validatePhone}
          />
          <TextInput
            name={fieldNames.password}
            onChange={this.onPasswordChange}
            value={password.value}
            validation={validatePassword}
          />
          <Button htmlType="submit">sign in</Button>
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

    const { phone, password } = this.props;

    const errors = lefts(
      snoc(
        array.of(validatePhone(phone.value)),
        validatePassword(password.value),
      ),
    );

    if (isNonEmpty(errors)) {
      return;
    }

    return;
  }
}

export default withHandlers<HandlersProps>(['phone', 'password'])(SignInForm);
