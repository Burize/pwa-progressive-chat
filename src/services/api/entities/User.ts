import { BindAll } from 'lodash-decorators';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import BaseApi from './BaseApi';
import { convertUserResponse, convertMemberResponse } from '../converters';
import { IServerUser, IServerMember } from '../models/user';
import { IUser, IMember } from 'shared/types/models/user';

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

}

export default User;
