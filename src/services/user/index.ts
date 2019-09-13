import * as Storage from 'services/storage';
import { UserService } from './UserService';

export const userService = new UserService(Storage.storage);
