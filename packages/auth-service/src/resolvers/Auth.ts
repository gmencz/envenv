import { Resolver, Query } from 'type-graphql';
import { auth } from '../data';
import Auth from '../entities/Auth';

@Resolver(() => Auth)
export default class AuthResolver {
  @Query(() => Auth)
  testAuth(): Auth {
    return auth[0];
  }
}
