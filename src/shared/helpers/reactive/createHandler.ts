
import { Observable, Subject } from 'rxjs';

export interface IHandler<A> {
  readonly handle: (value: A) => void;
  readonly value$: Observable<A>;
}

export const createHandler = <A = void>(): IHandler<A> => {
  const value = new Subject<A>();
  const handle = (val: A) => value.next(val);

  return {
    value$: value.asObservable(),
    handle,
  };
};
