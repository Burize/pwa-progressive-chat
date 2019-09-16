import { Branding } from '../utils';

export type UserId = Branding<'userId', string>;

export interface IUser {
  id: UserId;
  name: string;
  surname: string;
  phone: string;
  avatar: string;
}

export type IMember = Omit<IUser, 'phone'>;
