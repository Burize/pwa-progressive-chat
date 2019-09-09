import { IUser } from 'shared/types/models';
import { AuthToken } from 'services/api/types/Auth';

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
}

export default new Storage();
