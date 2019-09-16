import { Option } from 'fp-ts/lib/Option';

import { AuthToken } from './models/auth';

export interface IApiStorage {
  getAuthToken(): Option<AuthToken>;
}
