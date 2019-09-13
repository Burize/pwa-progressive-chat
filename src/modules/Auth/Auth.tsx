import * as React from 'react';
import { Route } from 'react-router-dom';

import { IModule } from 'shared/types/app';
import { routes } from 'modules/routes';

import { Auth } from './view';

const AuthModule: IModule = {
  getRoutes() {
    return [
      <Route key="auth" path={routes.auth} component={Auth} />,
    ];
  },
};

export default AuthModule;
