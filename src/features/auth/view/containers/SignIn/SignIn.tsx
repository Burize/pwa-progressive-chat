import * as React from 'react';
import { filter } from 'rxjs/operators';
import { isPending, isFailure, isSuccess } from '@devexperts/remote-data-ts';

import { block } from 'shared/helpers/bem';
import { withReactive, Observify } from 'shared/helpers/reactive';

import { SignInForm } from '../../components';
import { actions } from '../../../reactive';
import { TAuthentication } from '../../../namespace';

const b = block('sign-in');

interface IOwnProps {
  onAuthenticate(): void;
}

interface IReactiveProps {
  authentication: TAuthentication;
  authenticate(phone: string, password: string): void;
}

type Props = IOwnProps & IReactiveProps;

class SignIn extends React.PureComponent<Props> {

  public render() {
    const { authenticate, authentication } = this.props;
    return (
      <div className={b()}>
        <SignInForm
          onSubmit={authenticate}
          isDisabled={isPending(authentication)}
          error={isFailure(authentication) ? authentication.error : undefined}
        />
      </div>
    );
  }
}

const mapPropsToRx = (props: Props): Observify<IReactiveProps> => {
  const { authentication$, authenticate } = actions;
  authentication$.pipe(
    filter(isSuccess),
  ).subscribe(() => props.onAuthenticate());

  return {
    authenticate,
    authentication: authentication$,
  };
};

export default withReactive(SignIn)(mapPropsToRx);
