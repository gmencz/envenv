import { Resolver, Query } from 'type-graphql';

@Resolver()
export default class EnvironmentResolver {
  @Query(() => String)
  hiEnvironment(): string {
    return 'hello';
  }
}
