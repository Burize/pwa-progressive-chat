import { AuthToken } from './types/Auth';

export interface IApiStorage {
  getAuthToken(): AuthToken | null;
}
