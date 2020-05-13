import { Resolver, Query, Info } from 'type-graphql';
import { print } from 'graphql';
import { InfoParameter } from '../graphqlShared/interfaces';

@Resolver()
export default class EnvironmentResolver {
  @Query(() => String)
  hiEnvironment(@Info() { operation }: InfoParameter): string {
    console.log(print(operation));
    return 'hello';
  }
}
