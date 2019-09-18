import { UserId, IUser } from 'shared/types/models/user';
import { Src } from 'shared/types/app';

export interface IServerUser {
  id: UserId;
  firstName: string;
  secondName: string;
  phone: string;
  avatar: string;
}

export type IServerMember = Omit<IServerUser, 'phone'>;

export type IUpdateUserFields = Partial<Pick<IUser, 'name' | 'surname' | 'phone'>>;

export type IUpdateUserRequest = Partial<Pick<IServerUser, 'firstName' | 'secondName' | 'phone'>>;

export type IUpdateUserAvatarResponse = { avatar: Src };
