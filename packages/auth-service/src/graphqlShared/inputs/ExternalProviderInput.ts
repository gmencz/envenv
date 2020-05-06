import { InputType, Field } from 'type-graphql';

@InputType('ExternalProviderInput')
export default class ExternalProviderInput {
  @Field()
  username: string;

  @Field(() => Date)
  birthDate: Date;
}
