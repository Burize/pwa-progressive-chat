import { ReactElement } from 'react';
import { RouteProps } from 'react-router';
import { Api } from 'services/api';
import { storage } from 'services/storage';

export interface IModule {
  getRoutes(): ReactElement<RouteProps> | Array<ReactElement<RouteProps>>;
}

export interface IDependencies {
  api: Api;
  storage: typeof storage;
}

export type CommunicationType = 'success' | 'fetching' | 'fail';

export interface IBaseAction {
  type: CommunicationType;
}

export interface IFetchingAction extends IBaseAction {
  type: 'fetching';
}

export interface ISuccessAction<P> extends IBaseAction {
  payload: P;
  type: 'success';
}

export interface IFailAction<E> extends IBaseAction {
  error: E;
  type: 'fail';
}

export type IAction<P, E> = IFetchingAction | ISuccessAction<P> | IFailAction<E>;
