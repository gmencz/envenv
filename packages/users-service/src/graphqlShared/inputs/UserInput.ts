import { InputType, Field } from 'type-graphql';

@InputType('UserInput')
export default class UserInput {
  @Field()
  username: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: string;

  @Field()
  birthDate: Date;
}
