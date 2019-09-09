import { IUserStorage } from './namespace';

import * as Storage from 'services/storage';
import { IUser } from 'shared/types/models';

class UserService {
  constructor(private storage: IUserStorage) { }

  public saveUser(user: IUser) {
    this.storage.saveUser(user);
  }
}

export default new UserService(Storage.storage);
