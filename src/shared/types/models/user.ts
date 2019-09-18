import { Branding } from '../utils';
import { Src } from '../app';

export type UserId = Branding<'userId', string>;

export interface IUser {
  id: UserId;
  name: string;
  surname: string;
  phone: string;
  avatar: Src;
}

export type IMember = Omit<IUser, 'phone'>;
