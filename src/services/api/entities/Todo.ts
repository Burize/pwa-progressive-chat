import { BindAll } from 'lodash-decorators';

import BaseApi from './BaseApi';
import { map } from 'rxjs/operators';

@BindAll()
class SomeEntity extends BaseApi {

  public loadTodos() {
    return this.actions.get<ServerPayload[]>({
      url: '/notes',
    }).pipe(
      map(response => response.data),
      map(converter),
    );
  }

}

export default SomeEntity;
