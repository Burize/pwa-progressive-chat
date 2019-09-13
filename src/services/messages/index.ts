import { MessagesService } from './Messages';
import { socketService } from 'services/api/socket';

export const messagesService = new MessagesService(socketService);
