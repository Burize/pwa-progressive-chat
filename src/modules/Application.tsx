import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { BindAll } from 'lodash-decorators';

import { withDeps, IDependencies } from 'core/withDeps';
import { initializeServices } from 'core/initializeServices';

import { routes } from 'modules/routes';
import { MakeHandlersProps, withHandlers } from 'shared/helpers/reactive';
import { GlobalPreloader } from 'shared/view';

interface IOwnProps {
  authContract: IDependencies['authContract'];
}

type HandlerProps = MakeHandlersProps<'isAppReady'>;

type Props = IOwnProps & HandlerProps & RouteComponentProps<{}>;

@BindAll()
class Application extends React.PureComponent<Props> {

  public async componentDidMount() {
    const { authContract, isAppReady } = this.props;

    const isUserAuthenticated = authContract.isUserAuthenticated();

    if (!isUserAuthenticated) {
      this.onNeedRegister();
      return;
    }
    await initializeServices();
    isAppReady.setValue(true);
  }
  public render() {
    const { children, isAppReady } = this.props;
    return (
      <>
        {isAppReady.value && children}
        {!isAppReady.value && <GlobalPreloader />}
      </>
    );
  }

  private onNeedRegister() {
    const { isAppReady, history } = this.props;
    isAppReady.setValue(true);
    history.push(routes.auth);
  }
}

export default withRouter(
  withDeps(['authContract'])(
    withHandlers<HandlerProps>(['isAppReady'])(Application)),
);
