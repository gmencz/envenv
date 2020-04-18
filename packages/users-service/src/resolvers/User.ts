import { Resolver, Query } from 'type-graphql';
import { users } from '../data';
import User from '../entities/User';

@Resolver(() => User)
export default class UsersResolver {
  @Query(() => User)
  testUsers(): User {
    return users[0];
  }
}
