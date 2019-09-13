export interface IRegisterRequest {
  name: String;
  surname: String;
  phone: String;
  password: String;
}

export interface IServerRegisterRequest {
  firstName: String;
  secondName: String;
  phone: String;
  password: String;
}

export type AuthenticateResponse = AuthToken;

export type AuthToken = string;
