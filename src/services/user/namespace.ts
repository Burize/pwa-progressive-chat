import { Option } from 'fp-ts/lib/Option';

import { IUser } from 'shared/types/models/user';

export interface IUserStorage {
  saveUser(user: IUser): void;
  removeUser(): void;
  getUser(): Option<IUser>;
}
