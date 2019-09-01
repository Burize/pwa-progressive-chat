import { sequenceT } from 'fp-ts/lib/Apply';
import { Either, getValidation, left, map, mapLeft, right } from 'fp-ts/lib/Either';
import { getSemigroup, NonEmptyArray, map as ArrayMap } from 'fp-ts/lib/NonEmptyArray';
import { pipe } from 'fp-ts/lib/pipeable';

// tslint:disable:max-line-length

export type TValidator = (v: string) => Either<string, string>;

export type TValidation = (s: string) => Either<NonEmptyArray<string>, string>;

export const isRequired = (value: any): Either<string, any> =>
  value ? right(value) : left('Required');

export const minLength = (s: string): Either<string, string> =>
  s.length >= 6 ? right(s) : left('at least 6 characters');

export const oneCapital = (s: string): Either<string, string> =>
  /[A-Z]/g.test(s) ? right(s) : left('at least one capital letter');

export const oneNumber = (s: string): Either<string, string> =>
  /[0-9]/g.test(s) ? right(s) : left('at least one number');

export const isPhone = (s: string): Either<string, string> =>
  /^((\+7|7|8)([0-9]){10})$/.test(s) ? right(s) : left('invalid email format');

function lift<L, A>(
  validator: (v: A) => Either<L, A>,
): (v: A) => Either<NonEmptyArray<L>, A> {
  return v =>
    pipe(
      validator(v),
      mapLeft(a => [a]),
    );
}

export const getValidator = (...validators: NonEmptyArray<TValidator>) =>
  (s: string): Either<NonEmptyArray<string>, string> => {

    const arr = ArrayMap((v: TValidator) => lift(v)(s))(validators);
    const first = arr[0];
    arr.shift();
    return pipe(
      sequenceT(getValidation(getSemigroup<string>()))(
        first,
        ...arr, // spread????
      ),
      map(() => s),
    );
  };

export const validatePassword: TValidation = getValidator(isRequired, minLength, oneCapital, oneNumber);

export const validatePhone: TValidation = getValidator(isRequired, isPhone);
