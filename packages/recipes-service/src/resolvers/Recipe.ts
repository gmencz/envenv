import { Resolver, Query } from 'type-graphql';
import { recipes } from '../data';
import Recipe from '../entities/Recipe';

@Resolver(() => Recipe)
export default class RecipesResolver {
  @Query(() => Recipe)
  me(): Recipe {
    return recipes[0];
  }
}
