import { Field, ObjectType, Directive, ID } from 'type-graphql';

import { users } from '../data';

@Directive(`@key(fields: "id")`)
@ObjectType()
export default class User {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  name: string;

  @Field()
  birthDate: Date;
}

export async function resolveUserReference(
  reference: Pick<User, 'id'>
): Promise<User> {
  return users.find(u => u.id === reference.id)!;
}
