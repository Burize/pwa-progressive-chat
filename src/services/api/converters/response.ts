import { IUser } from 'shared/types/models';

import { IServerUser } from '../models/user';

export function convertUserResponse(user: IServerUser): IUser {
  return {
    id: user.id,
    name: user.firstName,
    surname: user.secondName,
    phone: user.phone,
    avatar: user.avatar,
  };
}
