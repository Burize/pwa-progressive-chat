import { IRegisterRequest, IServerRegisterRequest } from '../models/auth';

export function convertUserRegisterRequest(request: IRegisterRequest): IServerRegisterRequest {
  const { name, surname, phone, password } = request;
  return {
    firstName: name,
    secondName: surname,
    phone,
    password,
  };
}
