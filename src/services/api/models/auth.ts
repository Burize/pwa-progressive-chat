export interface IRegisterRequest {
  name: string;
  surname: string;
  phone: string;
  password: string;
}

export interface IServerRegisterRequest {
  firstName: string;
  secondName: string;
  phone: string;
  password: string;
}

export type AuthenticateResponse = AuthToken;

export type AuthToken = string;
