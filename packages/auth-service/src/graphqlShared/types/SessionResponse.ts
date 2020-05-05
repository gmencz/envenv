import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export default class SessionResponse {
  @Field()
  sessionId: string;

  @Field()
  csrfToken: string;
}
