import { BehaviorSubject } from 'rxjs';
import { none, Option, some, fold } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

import { IUser } from 'shared/types/models/user';
import { Src } from 'shared/types/app';

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

  public setAvatar(avatar: Src) {
    pipe(
      this.storage.getUser(),
      fold(
        () => { throw Error('empty user at setAvatar'); },
        (user) => {
          const newUser: IUser = { ...user, avatar };
          this.storage.saveUser(newUser);
          this._user$.next(some(newUser));
        },
      ),
    );
  }
}
