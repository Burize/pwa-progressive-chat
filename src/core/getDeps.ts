import { Api } from 'services/api';
import { messageService } from 'services/messages';
import { IDependencies } from 'shared/types/app';

const api = new Api();

export default function getDeps(): IDependencies {
  return { api, messageService };
}
