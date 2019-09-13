import { BindAll } from 'lodash-decorators';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import BaseApi from './BaseApi';
import { AuthenticateResponse, AuthToken, IRegisterRequest } from '../models/auth';
import { convertUserRegisterRequest } from '../converters';

@BindAll()
class Auth extends BaseApi {

  public authenticate(phone: string, password: string): Observable<AuthToken> {
    return this.actions.post<AuthenticateResponse>({
      url: '/auth',
      data: {
        phone, password,
      },
    }).pipe(
      map(response => this.handleResponse(response)),
    );
  }

  public register(registerFields: IRegisterRequest): Observable<AuthToken> {
    return this.actions.post<AuthToken>({
      url: '/user',
      data: convertUserRegisterRequest(registerFields),
    }).pipe(
      map(response => response.data),
    );
  }

}

export default Auth;
