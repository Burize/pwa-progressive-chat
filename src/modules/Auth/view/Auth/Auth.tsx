import * as React from 'react';

import { block } from 'shared/helpers/bem';
import { SignIn } from 'features/auth';
import { Layout } from 'shared/view';

const b = block('auth');

class Auth extends React.PureComponent {
  public render() {
    return (
      <Layout>
        <div className={b()}><SignIn /></div>
      </Layout>
    );
  }
}

export default Auth;
