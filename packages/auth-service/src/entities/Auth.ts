import { Field, ObjectType, Directive, ID } from 'type-graphql';
import { auth } from '../data';

@Directive(`@key(fields: "id")`)
@ObjectType()
export default class Auth {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  token: string;

  @Field()
  createdAt: Date;
}

export async function resolveAuthReference(
  reference: Pick<Auth, 'id'>
): Promise<Auth> {
  return auth.find(u => u.id === reference.id)!;
}
