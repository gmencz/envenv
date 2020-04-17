import { plainToClass } from 'class-transformer';
import Recipe from './entities/Recipe';

export const recipes: Recipe[] = plainToClass(Recipe, [
  {
    id: '1',
    name: 'Macarrones con queso',
    createdAt: '@createdAt',
    createdBy: 'Alan Turing',
  },
  {
    id: '2',
    name: 'Macarrones sin queso',
    createdAt: '@createdAt',
    createdBy: 'Alan Turing',
  },
]);