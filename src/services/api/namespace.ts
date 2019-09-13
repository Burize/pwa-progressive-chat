import { AuthToken } from './models/auth';

export interface IApiStorage {
  getAuthToken(): AuthToken | null;
}
