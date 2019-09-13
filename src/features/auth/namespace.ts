import { RemoteData } from '@devexperts/remote-data-ts';

import { IUser } from 'shared/types/models/user';
import { Either } from 'fp-ts/lib/Either';

export type TAuthentication = RemoteData<string, IUser>;
export type TRegistration = RemoteData<string, IUser>;

export interface IAuthContract {
  checkAuth(): Either<null, null>;
}
