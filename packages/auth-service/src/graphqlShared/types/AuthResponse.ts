import { ObjectType, Field } from 'type-graphql';
import User from '../../entities/User';

@ObjectType()
export default class AuthResponse {
  @Field(() => User)
  user: User;

  @Field()
  csrfToken: string;
}
