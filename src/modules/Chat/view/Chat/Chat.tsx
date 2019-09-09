import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { BindAll } from 'lodash-decorators';

import { block } from 'shared/helpers/bem';
import { Layout } from 'shared/view';

import './Chat.scss';

const b = block('auth-module');

type Props = RouteComponentProps<{}>;
@BindAll()
class Chat extends React.PureComponent<Props> {
  public render() {
    return (
      <Layout>
        <div className={b()}>
          chat
        </div>
      </Layout>
    );
  }
}

export default Chat;
