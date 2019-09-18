import { BehaviorSubject, of } from 'rxjs';
import { failure, success, initial, pending } from '@devexperts/remote-data-ts';
import { tap, switchMap, catchError, map } from 'rxjs/operators';
import { isSome } from 'fp-ts/lib/Option';

import getDeps from 'core/getDeps';
import { getErrorMessage } from 'shared/helpers/error';
import { userService } from 'services/user';

import { TAuthentication, TRegistration } from '../namespace';

const { api, storage } = getDeps();

const _authentication$ = new BehaviorSubject<TAuthentication>(initial);
export const authentication$ = _authentication$.asObservable();

export function authenticate(phone: string, password: string) {
  _authentication$.next(pending);
  api.auth.authenticate(phone, password)
    .pipe(
      tap((token) => storage.saveAuthToken(token)),
      switchMap(() => api.user.loadAccount()),
      tap(user => userService.saveUser(user)),
      map(user => success(user)),
      catchError(error => of(failure(getErrorMessage(error)))),
    ).subscribe(user => _authentication$.next(user));
}

const _registration$ = new BehaviorSubject<TRegistration>(initial);
export const registration$ = _registration$.asObservable();

export function register(name: string, surname: string, phone: string, password: string) {
  _registration$.next(pending);
  api.auth.register({ name, surname, phone, password })
    .pipe(
      tap(token => storage.saveAuthToken(token)),
      switchMap(() => api.user.loadAccount()),
      tap(user => userService.saveUser(user)),
      map(user => success(user)),
      catchError(error => of(failure(getErrorMessage(error)))),
    ).subscribe(user => _registration$.next(user));
}

export function isUserAuthenticated(): boolean {
  const token = storage.getAuthToken();
  return isSome(token);
}
