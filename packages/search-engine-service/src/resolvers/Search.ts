import { Resolver, Query } from 'type-graphql';
import User from './Search';
import { searches } from '../data';
import Search from '../entities/Search';

@Resolver(() => User)
export default class SearchResolver {
  @Query(() => Search)
  testSearchEngine(): Search[] {
    return [...searches];
  }
}
