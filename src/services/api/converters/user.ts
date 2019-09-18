import { IUser, IMember } from 'shared/types/models/user';
import { Src } from 'shared/types/app';

import {
  IServerUser, IServerMember, IUpdateUserFields, IUpdateUserRequest, IUpdateUserAvatarResponse,
} from '../models/user';
import { IRegisterRequest, IServerRegisterRequest } from '../models/auth';

export function convertUserRegisterRequest(request: IRegisterRequest): IServerRegisterRequest {
  const { name, surname, phone, password } = request;
  return {
    firstName: name,
    secondName: surname,
    phone,
    password,
  };
}

export function convertUserResponse(user: IServerUser): IUser {
  return {
    id: user.id,
    name: user.firstName,
    surname: user.secondName,
    phone: user.phone,
    avatar: user.avatar as Src,
  };
}

export function convertMemberResponse(members: IServerMember[]): IMember[] {
  return members.map(convertServerMember);
}

export function convertServerMember(member: IServerMember): IMember {
  return {
    id: member.id,
    name: member.firstName,
    surname: member.secondName,
    avatar: member.avatar as Src,
  };
}

export function convertUserUpdateRequest(fields: IUpdateUserFields): IUpdateUserRequest {
  const { name, surname, phone } = fields;
  return {
    firstName: name,
    secondName: surname,
    phone,
  };
}

export function convertUserAvatarUpdateRequest(response: IUpdateUserAvatarResponse): Src {
  return response.avatar;
}
