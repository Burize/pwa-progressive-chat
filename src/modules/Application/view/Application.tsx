import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { BindAll } from 'lodash-decorators';
import { withDeps, IDependencies } from 'core/withDeps';
import { fold } from 'fp-ts/lib/Either';
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

  public componentDidMount() {
    const { authContract, isAppReady } = this.props;

    fold(this.onNeedRegister, () => isAppReady.setValue(true))(authContract.checkAuth());
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
    this.props.isAppReady.setValue(true);
    this.props.history.push(routes.auth);
  }
}

export default withRouter(
  withDeps(['authContract'])(
    withHandlers<HandlerProps>(['isAppReady'])(Application)),
);
