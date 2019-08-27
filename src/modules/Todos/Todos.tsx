import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { IModule } from 'shared/types/app';
import { routes } from 'modules/routes';

import { Todos } from './view';

const TodosModule: IModule = {
  getRoutes() {
    return (
      <Route key="createDomain" path={routes.todos}>
        <Switch>
          <Route path={routes.todos} component={Todos} />
          <Redirect to={routes.todos} />
        </Switch>
      </Route>
    );
  },
};

export default TodosModule;
