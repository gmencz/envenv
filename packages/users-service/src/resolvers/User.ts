import { Resolver, Query } from 'type-graphql';
import User from '../entities/User';

@Resolver(() => User)
export default class UsersResolver {
  @Query(() => [User])
  async testUsers(): Promise<User[]> {
    const users = await User.find();

    return users;
  }
}
