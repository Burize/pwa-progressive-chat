import { UserId } from 'shared/types/models';

export interface IServerUser {
  id: UserId;
  firstName: String;
  secondName: String;
  phone: String;
  avatar: String;
}
