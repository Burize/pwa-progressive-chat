import { BehaviorSubject, of } from 'rxjs';
import { failure, success, initial, isSuccess, pending } from '@devexperts/remote-data-ts';
import { catchError, map, tap } from 'rxjs/operators';

import getDeps from 'core/getDeps';
import { IUpdateUserFields } from 'services/api/models/user';
import { userService } from 'services/user';
import { getErrorMessage } from 'shared/helpers/error';
import { Base64 } from 'shared/types/file';

import { UpdatingUser } from '../namespace';

const { api } = getDeps();

const _updatingUser$ = new BehaviorSubject<UpdatingUser>(initial);
export const updatingUser$ = _updatingUser$.asObservable();

export function update(updatedFields: IUpdateUserFields) {
  _updatingUser$.next(pending);
  api.user.updateUser(updatedFields)
    .pipe(
      map(updatedUser => success(updatedUser)),
      tap(updatedUser => isSuccess(updatedUser) && userService.saveUser(updatedUser.value)),
      catchError(error => of(failure(getErrorMessage(error)))),
    ).subscribe(_ => _updatingUser$.next(success(null)));
}

export function uploadAvatar(avatar: Base64) {
  _updatingUser$.next(pending);
  api.user.updateUserAvatar(avatar)
    .pipe(
      map(updatedAvatar => success(updatedAvatar)),
      tap(updatedAvatar => isSuccess(updatedAvatar) && userService.setAvatar(updatedAvatar.value)),
      catchError(error => of(failure(getErrorMessage(error)))),
    ).subscribe(_ => _updatingUser$.next(success(null)));
}
