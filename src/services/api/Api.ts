import HttpActions from './HttpActions';
import { Auth, User } from './entities';
import { IApiStorage } from './namespace';

class Api {
  public auth: Auth;
  public user: User;

  constructor(storage: IApiStorage) {
    const actions = new HttpActions(storage);
    this.auth = new Auth(actions);
    this.user = new User(actions);
  }

}

export default Api;
