import { IUser } from 'shared/types/models/user';
import { AuthToken } from 'services/api';

import { Option, some, none } from 'fp-ts/lib/Option';

const keys = {
  user: 'user',
  authToken: 'auth.token',
};

class Storage {

  public saveAuthToken(token: AuthToken) {
    localStorage.setItem(keys.authToken, token);
  }

  public getAuthToken(): AuthToken | null {
    return localStorage.getItem(keys.authToken);
  }

  public saveUser(user: IUser) {
    localStorage.setItem(keys.user, JSON.stringify(user));
  }

  public getUser(): Option<IUser> {
    const user = localStorage.getItem(keys.user);
    return user ? some(JSON.parse(user)) : none;
  }
}

export default new Storage();
