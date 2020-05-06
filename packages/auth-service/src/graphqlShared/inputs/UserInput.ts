import { InputType, Field } from 'type-graphql';

@InputType('UserCustomInput')
export default class UserInput {
  @Field({ nullable: true })
  id: string;

  @Field()
  username: string;

  @Field()
  name: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  role: string;

  @Field({ nullable: true })
  provider: string;

  @Field()
  birthDate: Date;

  @Field({ nullable: true })
  picture: string;
}
