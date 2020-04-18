import { plainToClass } from 'class-transformer';
import Search from './entities/Search';

export const searches: Search[] = plainToClass(Search, [
  {
    id: '1',
    searchedBy: {
      id: '1',
      username: 'JaneDoe123',
      name: 'Jane',
      birthDate: new Date('1997'),
    },
    searchQueryString: 'Test',
    searchedAt: new Date(),
  },
  {
    id: '1',
    searchedBy: {
      id: '2',
      username: 'JohnDoe123',
      name: 'John',
      birthDate: new Date('1999'),
    },
    searchQueryString: 'Test',
    searchedAt: new Date(),
  },
]);
