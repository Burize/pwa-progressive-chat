// tslint:disable:max-line-length
export const isRequired = (value: any) => (value ? undefined : 'Required');

export function validateEmail(email: string) {
  const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegExp.test(String(email).toLowerCase()) ? undefined : 'Invalid email';
}
