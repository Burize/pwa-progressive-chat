import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Option, fold } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

import { navigationRoutes } from 'modules/routes';
import { ChatMessages } from 'features/chatMessages';
import { block } from 'shared/helpers/bem';
import { Layout, Navigation } from 'shared/view';
import { withReactive, Observify } from 'shared/helpers/reactive';
import { userService } from 'services/user';
import { IUser } from 'shared/types/models/user';

import './Chat.scss';

const b = block('chat-module');

interface IReactiveProps {
  user: Option<IUser>;
}

type Props = IReactiveProps & RouteComponentProps<{}>;

class Chat extends React.PureComponent<Props> {
  public render() {
    const { user } = this.props;
    return (
      <Layout
        headerContent={pipe(
          user,
          fold(() => undefined, (u) => <Navigation routes={navigationRoutes} user={u} />),
        )}
        fixedHeight
      >
        <div className={b()}>
          <ChatMessages />
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

export default withReactive(Chat)(mapPropsToRx);
