import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Option, fold } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

import { userService } from 'services/user';
import { navigationRoutes } from 'modules/routes';
import { ProfileSettings } from 'features/manageProfile';
import { block } from 'shared/helpers/bem';
import { Layout, Navigation } from 'shared/view';
import { withReactive, Observify } from 'shared/helpers/reactive';
import { IUser } from 'shared/types/models/user';

const b = block('profile-module');

interface IReactiveProps {
  user: Option<IUser>;
}

type Props = IReactiveProps & RouteComponentProps<{}>;

class Profile extends React.PureComponent<Props> {
  public render() {
    const { user } = this.props;
    return (
      <Layout
        headerContent={
          pipe(
            user,
            fold(() => undefined, (u) => <Navigation routes={navigationRoutes} user={u} />),
          )}
      >
        <div className={b()}>
          <ProfileSettings />
        </div>
      </Layout>
    );
  }
}

const mapPropsToRx = (): Observify<IReactiveProps> => {
  return {
    user: userService.user$,
  };
};

export default withReactive(Profile)(mapPropsToRx);
