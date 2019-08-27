import { Observable } from 'rxjs';

import { ICommunication } from 'shared/types/reactive';

export default function makeSelectCommunication<T extends Record<string, Observable<ICommunication>>>(state: T) {
  return (key: keyof T) => state[key];
}
