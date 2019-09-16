import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { BindAll } from 'lodash-decorators';

import { routes } from 'modules/routes';
import { SignIn } from 'features/auth';
import { block } from 'shared/helpers/bem';
import { Layout } from 'shared/view';
import { Tabs } from 'shared/view/elements';
import SignUp from 'features/auth/view/containers/SignUp/SignUp';

import './Auth.scss';
import { initializeServices } from 'core/initializeServices';

const b = block('auth-module');

type Props = RouteComponentProps<{}>;
@BindAll()
class Auth extends React.PureComponent<Props> {
  public render() {
    return (
      <Layout>
        <div className={b()}>
          <Tabs defaultActiveKey="SignIn" size="large">
            <Tabs.TabPane tab="Sign In" key="SignIn">
              <div className={b('form')}>
                <SignIn onAuthenticate={this.onAuthEnd} />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Sign Up" key="SignUp">
              <div className={b('form')}>
                <SignUp onRegister={this.onAuthEnd} />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Layout>
    );
  }

  private async onAuthEnd() {
    await initializeServices();
    this.props.history.push(routes.chat);
  }
}

export default Auth;
