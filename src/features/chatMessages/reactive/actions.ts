import { BehaviorSubject, of, combineLatest } from 'rxjs';
import { failure, success, isSuccess } from '@devexperts/remote-data-ts';
import { catchError, map, filter, scan } from 'rxjs/operators';
import { fromNullable, none, some, Option, fold } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

import getDeps from 'core/getDeps';
import { messagesService } from 'services/messages';
import { getErrorMessage } from 'shared/helpers/error';
import { IMember, UserId } from 'shared/types/models/user';

import { IMessageWithAuthor } from '../namespace';

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

messagesService.messagesEvents$.pipe(
  map(ev => ev.type === 'allMessages' ? ev.payload.map(m => m.userId) : [ev.payload.userId]),
).subscribe(authorIds => loadMembers(authorIds));

const _messageWithMembers$ = new BehaviorSubject<Option<IMessageWithAuthor[]>>(none);
export const messageWithMembers$ = _messageWithMembers$.asObservable();
combineLatest(messagesService.messages$, members$).pipe(
  map(
    ([optionMessages, members]) => pipe(
      optionMessages,
      fold(
        () => none,
        messages => some(messages.map(message => (
          {
            message,
            author: fromNullable(members.find(member => member.id === message.userId)),
          })),
        )),
    ),
  ),
).subscribe(_messageWithMembers$);
