import { BehaviorSubject, of } from 'rxjs';
import { failure, success, isSuccess } from '@devexperts/remote-data-ts';
import { catchError, map, filter, scan } from 'rxjs/operators';

import getDeps from 'core/getDeps';
import { getErrorMessage } from 'shared/helpers/error';

import { IMember, UserId } from 'shared/types/models/user';

const { api } = getDeps();

const _members$ = new BehaviorSubject<IMember[]>([]);
export function loadMembers(ids: UserId[]) {
  api.user.loadMembers(ids)
    .pipe(
      map(members => success(members)),
      catchError(error => of(failure(getErrorMessage(error)))),
    ).pipe(
      filter(isSuccess),
      map(members => members.value),
    ).subscribe(members => _members$.next(members));
}
export const members$ = _members$
  .pipe(
    scan<IMember[]>((members, newMembers) => members.concat(newMembers)),
  );
