import { Directive, ObjectType, Field, ID } from 'type-graphql';

@Directive('@extends')
@Directive(`@key(fields: "id")`)
@ObjectType()
export default class User {
  @Directive('@external')
  @Field(() => ID)
  id: string;

  @Directive('@external')
  @Field(() => String)
  picture: string;

  @Directive('@external')
  @Field(() => String)
  password: string;

  @Directive('@external')
  @Field(() => String)
  role: string;

  @Directive('@external')
  @Field(() => String)
  provider: string;

  @Directive('@external')
  @Field(() => String)
  username: string;

  @Directive('@external')
  @Field(() => String)
  name: string;

  @Directive('@external')
  @Field(() => Date)
  birthDate: Date;
}
