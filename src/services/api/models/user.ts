import { UserId } from 'shared/types/models/user';

export interface IServerUser {
  id: UserId;
  firstName: String;
  secondName: String;
  phone: String;
  avatar: String;
}

export type IServerMember = Omit<IServerUser, 'phone'>;
