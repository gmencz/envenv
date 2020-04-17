import { plainToClass } from 'class-transformer';
import Log from './entities/Log';

export const logs: Log[] = plainToClass(Log, [
  {
    id: '1',
    createdAt: '@createdAt',
    message: 'Mensaje de log',
  },
  {
    id: '2',
    createdAt: '@createdAt',
    message: 'Mensaje de log 2',
  },
]);