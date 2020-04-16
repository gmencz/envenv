import { Resolver, Query } from 'type-graphql';
import User from './user';
import { users } from '../data';

@Resolver(() => User)
export default class UsersResolver {
  @Query(() => User)
  me(): User {
    // @ts-ignore
    return users[0];
  }
}
