import { UserId } from 'shared/types/models/user';

export interface IServerUser {
  id: UserId;
  firstName: string;
  secondName: string;
  phone: string;
  avatar: string;
}

export type IServerMember = Omit<IServerUser, 'phone'>;
