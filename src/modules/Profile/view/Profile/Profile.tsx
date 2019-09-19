import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Option, fold } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { BindAll } from 'lodash-decorators';

import { withDeps, IDependencies } from 'core/withDeps';
import { userService } from 'services/user';
import { navigationRoutes, routes } from 'modules/routes';
import { ProfileSettings } from 'features/manageProfile';
import { block } from 'shared/helpers/bem';
import { Layout, Navigation } from 'shared/view';
import { withReactive, Observify } from 'shared/helpers/reactive';
import { IUser } from 'shared/types/models/user';
import { Button } from 'shared/view/elements';

import './Profile.scss';

const b = block('profile-module');

interface IOwnProps {
  authContract: IDependencies['authContract'];
}

interface IReactiveProps {
  user: Option<IUser>;
}

type IProps = IOwnProps & IReactiveProps & RouteComponentProps<{}>;

@BindAll()
class Profile extends React.PureComponent<IProps> {
  public render() {
    const { user } = this.props;
    return (
      <Layout
        headerContent={
          pipe(
            user,
            fold(() => undefined, (u) => <div className={b('header')}>
              <Navigation routes={navigationRoutes} user={u} />
              <Button type="ghost" onClick={this.logout}>Logout</Button>
            </div>),
          )}
      >
        <div className={b()}>
          <ProfileSettings />
        </div>
      </Layout>
    );
  }

  private logout() {
    const { authContract, history } = this.props;
    authContract.logout();
    history.push(routes.auth);
  }
}

const mapPropsToRx = (): Observify<IReactiveProps> => {
  return {
    user: userService.user$,
  };
};

export default withRouter(
  withDeps(['authContract'])(
    withReactive(Profile)(mapPropsToRx),
  ),
);
