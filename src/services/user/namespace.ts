import { IUser } from 'shared/types/models';

export interface IUserStorage {
  saveUser(user: IUser): void;
}
