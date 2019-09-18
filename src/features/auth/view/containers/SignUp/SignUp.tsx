import * as React from 'react';
import { filter } from 'rxjs/operators';
import { isPending, isFailure, isSuccess } from '@devexperts/remote-data-ts';

import { block } from 'shared/helpers/bem';
import { withReactive, Observify } from 'shared/helpers/reactive';

import { SignUpForm } from '../../components';
import { actions } from '../../../reactive';
import { TRegistration } from '../../../namespace';

const b = block('sign-up');

interface IOwnProps {
  onRegister(): void;
}

interface IReactiveProps {
  registration: TRegistration;
  register(name: string, surname: string, phone: string, password: string): void;
}

type Props = IOwnProps & IReactiveProps;

class SignUp extends React.PureComponent<Props> {

  public render() {
    const { register, registration } = this.props;
    return (
      <div className={b()}>
        <SignUpForm
          onSubmit={register}
          isDisabled={isPending(registration)}
          error={isFailure(registration) ? registration.error : undefined}
        />
      </div>
    );
  }
}

const mapPropsToRx = (props: Props): Observify<IReactiveProps> => {

  actions.registration$.pipe(
    filter(isSuccess),
  ).subscribe(() => props.onRegister());

  return {
    register: actions.register,
    registration: actions.registration$,
  };
};

export default withReactive(SignUp)(mapPropsToRx);
