import { Option } from 'fp-ts/lib/Option';

import { IChatMessage } from 'shared/types/models/message';
import { IMember } from 'shared/types/models/user';

export interface IMessageWithAuthor {
  message: IChatMessage;
  author: Option<IMember>;
}
