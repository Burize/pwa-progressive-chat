import * as React from 'react';
import { Route } from 'react-router-dom';

import { IModule } from 'shared/types/app';
import { routes } from 'modules/routes';

import { Profile } from './view';

const ProfileModule: IModule = {
  getRoutes() {
    return [
      <Route key="profile" path={routes.profile} component={Profile} />,
    ];
  },
};

export default ProfileModule;
