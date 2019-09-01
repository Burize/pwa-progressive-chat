import * as React from 'react';
import { block } from 'shared/helpers/bem';
import { SignInForm } from '../../components';

const b = block('sign-in');

class SignIn extends React.PureComponent<any> {

  public render() {
    return (
      <div className={b()}>
        <SignInForm />
      </div>
    );
  }
}

export default SignIn;
