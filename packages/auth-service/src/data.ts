import { plainToClass } from 'class-transformer';
import Auth from './entities/Auth';

export const auth: Auth[] = plainToClass(Auth, [
  {
    id: '1',
    userId: '',
    token: 'token',
    createdAt: '@createdAt',
  },
]);
