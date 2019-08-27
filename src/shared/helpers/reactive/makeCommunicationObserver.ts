import { ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/reactive';
import { Observable } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';

interface IProtectAction {
  type: '';
  error: any;
}

export default function makeCommunicationReducer<
  E extends IPlainAction<string> = IProtectAction,
  C extends IPlainAction<string> = IProtectAction,
  F extends IPlainFailAction<string> = IProtectAction,
  D extends IPlainAction<string> = IProtectAction,
  >(
    action$: Observable<IPlainAction<string>>,
    initial: ICommunication<F['error']>,
    executeType: E['type'],
    completedType: C['type'],
    failedType: F['type'],
    resetType?: D['type'],
): Observable<ICommunication<string>> {
  const reducer = (state: ICommunication<F['error']> = initial, action: IPlainAction<string>) => {
    switch (action.type) {
      case executeType: return { error: '', isRequesting: true };
      case completedType: return { error: '', isRequesting: false };
      case failedType: return { error: (action as F).error, isRequesting: false };
      case resetType: return { error: '', isRequesting: false };
      default: return state;
    }
  };
  return action$.pipe(
    scan((prevState, action) => {
      return reducer(prevState, action);
    }, initial),
    startWith(initial),
  );
}
