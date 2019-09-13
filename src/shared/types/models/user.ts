import { Branding } from '../utils';

export type UserId = Branding<'userId', string>;

export interface IUser {
  id: UserId;
  name: String;
  surname: String;
  phone: String;
  avatar: String;
}

export type IMember = Omit<IUser, 'phone'>;
