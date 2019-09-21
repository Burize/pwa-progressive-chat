import * as React from 'react';
import { BindAll } from 'lodash-decorators';

import { fold, either } from 'fp-ts/lib/Either';
import { sequenceT } from 'fp-ts/lib/Apply';
import { pipe } from 'fp-ts/lib/pipeable';

import { block } from 'shared/helpers/bem';
import { TextInput, Button } from 'shared/view/elements';
import { withHandlers, MakeHandlersProps } from 'shared/helpers/reactive';
import { validatePassword, validatePhone, validateName } from 'shared/helpers/forms/validations';

import './SignUpForm.scss';

const b = block('sign-up-form');

interface IOwnProps {
  isDisabled?: boolean;
  error?: string;
  onSubmit(name: string, surname: string, phone: string, password: string): void;
}

type HandlersProps = MakeHandlersProps<'name' | 'surname' | 'phone' | 'password'>;

const fieldNames = {
  name: 'name',
  surname: 'surname',
  phone: 'phone',
  password: 'password',

};

type Props = IOwnProps & HandlersProps;

@BindAll()
class SignUpForm extends React.PureComponent<Props> {

  public render() {
    const { name, surname, phone, password, isDisabled, error } = this.props;

    return (
      <div className={b()}>
        <form onSubmit={this.onSubmit}>
          <TextInput
            name={fieldNames.name}
            label="Name"
            onChange={this.onNameChange}
            value={name.value}
            validation={validateName}
          />
          <TextInput
            name={fieldNames.surname}
            label="Surname"
            onChange={this.onSurnameChange}
            value={surname.value}
            validation={validateName}
          />
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
            autoComplete="new-password"
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
            sign up
          </Button>
          <div className={b('error')}>
            {error}
          </div>
        </form>
      </div>
    );
  }

  public onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.name.setValue(e.target.value);
  }

  public onSurnameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.surname.setValue(e.target.value);
  }

  public onPhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.phone.setValue(e.target.value);
  }

  public onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.password.setValue(e.target.value);
  }

  public onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { name, surname, phone, password, onSubmit } = this.props;

    pipe(
      sequenceT(either)(
        validateName(name.value),
        validateName(surname.value),
        validatePhone(phone.value),
        validatePassword(password.value),
      ),
      fold(
        (_) => null,
        ([nameValue, surnameValue, phoneValue, passwordValue]) => {
          onSubmit(nameValue, surnameValue, phoneValue, passwordValue);
        },
      ),
    );
  }
}

export default withHandlers<HandlersProps>(['name', 'surname', 'phone', 'password'])(SignUpForm);
