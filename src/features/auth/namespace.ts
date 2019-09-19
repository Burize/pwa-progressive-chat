import { RemoteData } from '@devexperts/remote-data-ts';

import { IUser } from 'shared/types/models/user';

export type TAuthentication = RemoteData<string, IUser>;
export type TRegistration = RemoteData<string, IUser>;

export interface IAuthContract {
  isUserAuthenticated(): boolean;
  logout(): void;
}
