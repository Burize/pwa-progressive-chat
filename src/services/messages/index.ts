import getDeps from 'core/getDeps';
import { MessagesService } from './Messages';

const { socket } = getDeps();

export const messagesService = new MessagesService(socket);
