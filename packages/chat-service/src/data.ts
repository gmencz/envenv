import { plainToClass } from 'class-transformer';
import Message from './entities/Message';

export const messages: Message[] = plainToClass(Message, [
  {
    id: '1',
    sentAt: new Date(),
    message: 'Hello John',
    sentBy: {
      id: '1',
      username: 'JaneDoe123',
      name: 'Jane',
    },
  },
  {
    id: '2',
    sentAt: new Date(),
    message: 'Hello Jane',
    sentBy: {
      id: '2',
      username: 'JohnDoe123',
      name: 'John',
    },
  },
]);
