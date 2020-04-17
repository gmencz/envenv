import { Resolver, Query } from 'type-graphql';
import Recipe from './recipe';
import { recipes } from '../data';

@Resolver(() => Recipe)
export default class RecipesResolver {
  @Query(() => Recipe)
  me(): Recipe {
    // @ts-ignore
    return re[0];
  }
}
