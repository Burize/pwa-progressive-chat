import * as React from 'react';
import { Switch, BrowserRouter, Redirect } from 'react-router-dom';

import Application from 'modules/Application';
import { defaultRoute } from 'modules/routes';
import * as modules from 'modules';

import 'shared/styles/fonts/index.scss';
import 'shared/styles/antd-overrides.scss';
import 'shared/styles/common.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Application>
        <Switch>
          {Object.values(modules).map(module => module.getRoutes())}
          <Redirect to={defaultRoute} />
        </Switch>
      </Application>
    </BrowserRouter>
  );
};

export default App;
