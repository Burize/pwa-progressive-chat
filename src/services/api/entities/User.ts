import { BindAll } from 'lodash-decorators';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IUser, IMember } from 'shared/types/models/user';
import { Base64 } from 'shared/types/file';
import { Src } from 'shared/types/app';

import {
  convertUserResponse, convertMemberResponse, convertUserUpdateRequest, convertUserAvatarUpdateRequest,
} from '../converters';
import { IServerUser, IServerMember, IUpdateUserFields, IUpdateUserAvatarResponse } from '../models/user';
import BaseApi from './BaseApi';

@BindAll()
class User extends BaseApi {

  public loadAccount(): Observable<IUser> {
    return this.actions.get<IServerUser>({
      url: '/user/me',
      isProtected: true,
    }).pipe(
      map(response => this.handleResponse(response, convertUserResponse)),
    );
  }

  public loadMembers(ids: string[]): Observable<IMember[]> {
    return this.actions.get<IServerMember[]>({
      url: `/members/${JSON.stringify(ids)}`,
      isProtected: true,
    }).pipe(
      map(response => this.handleResponse(response, convertMemberResponse)),
    );
  }

  public updateUser(fields: IUpdateUserFields): Observable<IUser> {
    return this.actions.patch<IServerUser[]>({
      url: `/user`,
      data: convertUserUpdateRequest(fields),
      isProtected: true,
    }).pipe(
      map(response => this.handleResponse(response, convertUserResponse)),
    );
  }

  public updateUserAvatar(avatar: Base64): Observable<Src> {
    return this.actions.patch<IUpdateUserAvatarResponse>({
      url: `/user/avatar`,
      data: { 'avatar': avatar },
      isProtected: true,
    }).pipe(
      map(response => this.handleResponse(response, convertUserAvatarUpdateRequest)),
    );
  }

}

export default User;
