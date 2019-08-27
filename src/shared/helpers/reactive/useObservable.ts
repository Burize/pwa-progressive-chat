import * as React from 'react';
import { Observable, Subject } from 'rxjs';

function useObservable<State, Action>(
  createState: (action: Observable<Action>) => Observable<State>,
  initialState: State,
): [State, (action: Action) => void];
function useObservable<State, Action>(
  createState: (action: Observable<Action>) => Observable<State>,
): [State | undefined, (action: Action) => void];
function useObservable<State, Action>(
  createState: (action: Observable<Action>) => Observable<State>,
  initialState?: State,
): [State | undefined, (action: Action) => void] {

  const [state, setState] = React.useState<State | undefined>(initialState);

  const [action$] = React.useState(new Subject<Action>());

  const pushValue = React.useCallback((action: Action) => {
    action$.next(action);
  }, []);

  React.useEffect(() => {
    const output$ = createState(action$);

    output$.subscribe(currentState => {
      setState(currentState);
    });
  }, []);

  return [state, pushValue];
}

export default useObservable;
