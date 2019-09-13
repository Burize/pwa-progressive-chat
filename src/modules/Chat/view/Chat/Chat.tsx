import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { BindAll } from 'lodash-decorators';

import { ChatMessages } from 'features/chatMessages';
import { block } from 'shared/helpers/bem';
import { Layout } from 'shared/view';

import './Chat.scss';

const b = block('chat-module');

type Props = RouteComponentProps<{}>;
@BindAll()
class Chat extends React.PureComponent<Props> {
  public render() {
    return (
      <Layout>
        <div className={b()}>
          <ChatMessages />
        </div>
      </Layout>
    );
  }
}

export default Chat;
