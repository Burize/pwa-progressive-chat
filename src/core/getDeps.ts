import { Api } from 'services/api';
import { IDependencies } from 'shared/types/app';
import { storage } from 'services/storage';

const api = new Api(storage);

export default function getDeps(): IDependencies {
  return { api, storage };
}
