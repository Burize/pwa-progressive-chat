import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { IModule } from 'shared/types/app';
import { routes } from 'modules/routes';

import { Auth } from './view';

const TodosModule: IModule = {
  getRoutes() {
    return (
      <Route key="auth" path={routes.auth}>
        <Switch>
          <Route path={routes.auth} component={Auth} />
          <Redirect to={routes.auth} />
        </Switch>
      </Route>
    );
  },
};

export default TodosModule;
