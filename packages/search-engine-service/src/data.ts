import { plainToClass } from 'class-transformer';
import Search from './entities/Search';

export const searches: Search[] = plainToClass(Search, [
  {
    id: '1',
    searchedBy: {
      id: '1',
      username: 'JaneDoe123',
      name: 'Jane',
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
    },
    searchQueryString: 'Test',
    searchedAt: new Date(),
  },
]);
