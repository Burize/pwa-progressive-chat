import { ReactElement } from 'react';
import { RouteProps } from 'react-router';
import { Api } from 'services/api';

export interface IModule {
  getRoutes(): ReactElement<RouteProps> | Array<ReactElement<RouteProps>>;
}

export interface IDependencies {
  api: Api;
}
