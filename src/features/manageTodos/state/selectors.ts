import { map } from 'rxjs/operators';

import { makeSelectCommunication } from 'shared/helpers/reactive';

import { dataState$, communicationState } from './entry';

export function selectTodos() {
  return dataState$.pipe(
    map(state => state.todos),
  );
}

export const selectCommunication = makeSelectCommunication(communicationState);
