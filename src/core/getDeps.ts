import { Api, Socket } from 'services/api';
import { IDependencies } from 'shared/types/app';
import { storage } from 'services/storage';
import getEnvParams from 'shared/helpers/getEnvParams';

const { wsUrl } = getEnvParams();

const api = new Api(storage);
const socket = new Socket(wsUrl);

export default function getDeps(): IDependencies {
  return { storage, api, socket };
}
