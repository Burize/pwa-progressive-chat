import * as React from 'react';
import { Route } from 'react-router-dom';

import { IModule } from 'shared/types/app';
import { routes } from 'modules/routes';

import { Chat } from './view';

const ChatModule: IModule = {
  getRoutes() {
    return [
      <Route key="chat" path={routes.chat} component={Chat} />,
    ];
  },
};

export default ChatModule;
