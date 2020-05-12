import { Resolver, Query } from 'type-graphql';
import Environment from '../entities/Environment';

@Resolver(() => Environment)
export default class EnvironmentResolver {
  @Query(() => String)
  hiEnvironment(): string {
    return 'hello';
  }
}
