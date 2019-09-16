import { Option, some, none, fromNullable } from 'fp-ts/lib/Option';

import { IUser } from 'shared/types/models/user';
import { AuthToken } from 'services/api';

const keys = {
  user: 'user',
  authToken: 'auth.token',
};

export default class Storage {

  public saveAuthToken(token: AuthToken) {
    localStorage.setItem(keys.authToken, token);
  }

  public getAuthToken(): Option<AuthToken> {
    return fromNullable(localStorage.getItem(keys.authToken));
  }

  public saveUser(user: IUser) {
    localStorage.setItem(keys.user, JSON.stringify(user));
  }

  public getUser(): Option<IUser> {
    const user = localStorage.getItem(keys.user);
    return user ? some(JSON.parse(user)) : none;
  }
}
