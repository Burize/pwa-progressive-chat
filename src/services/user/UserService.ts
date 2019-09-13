import { BehaviorSubject } from 'rxjs';
import { none, Option, some } from 'fp-ts/lib/Option';

import { IUser } from 'shared/types/models/user';

import { IUserStorage } from './namespace';

export class UserService {
  private _user$ = new BehaviorSubject<Option<IUser>>(none);
  public user$ = this._user$.asObservable();

  constructor(private storage: IUserStorage) {
    this.initialize();
  }

  private initialize() {
    const user = this.storage.getUser();
    this._user$.next(user);
  }

  public saveUser(user: IUser) {
    this.storage.saveUser(user);
    this._user$.next(some(user));
  }
}
