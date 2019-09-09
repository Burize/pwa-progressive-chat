import { BindAll } from 'lodash-decorators';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import BaseApi from './BaseApi';
import { convertUserResponse } from '../converters';
import { IServerUser } from '../models/user';
import { IUser } from 'shared/types/models';

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

}

export default User;
