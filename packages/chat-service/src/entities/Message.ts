import { Directive, ObjectType, Field, ID } from 'type-graphql';
import User from './User';
import { messages } from '../data';

@Directive(`@key(fields: "id")`)
@ObjectType()
export default class Message {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  sentAt: Date;

  @Field(() => String)
  message: string;

  @Field(() => User)
  sentBy: User;
}

export async function resolveMessageReference(
  reference: Pick<Message, 'id'>
): Promise<Message> {
  return messages.find(msg => msg.id === reference.id) as Message;
}
