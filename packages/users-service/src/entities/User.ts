import { Field, ObjectType, Directive, ID } from 'type-graphql';

import { users } from '../data';

@Directive(`@key(fields: "id")`)
@ObjectType()
export default class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  birthDate: Date;
}

export async function resolveUserReference(
  reference: Pick<User, 'id'>
): Promise<User> {
  return users.find(u => u.id === reference.id) as User;
}
