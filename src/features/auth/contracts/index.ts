import { IAuthContract } from '../namespace';
import { actions } from '../reactive';

export const authContract: IAuthContract = {
  checkAuth: actions.checkAuth,
};
