import { IAuthContract } from '../namespace';
import { actions } from '../reactive';

export const authContract: IAuthContract = {
  isUserAuthenticated: actions.isUserAuthenticated,
};
