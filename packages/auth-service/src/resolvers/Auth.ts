import { Resolver, Query } from 'type-graphql';
import Auth from './auth';
import { auth } from '../data';

@Resolver(() => Auth)
export default class AuthResolver {
  @Query(() => Auth)
  me(): Auth {
    // @ts-ignore
    return auth[0];
  }
}
