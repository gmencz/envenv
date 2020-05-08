import { Directive, ObjectType, Field, ID } from 'type-graphql';

/* 
  We need this type to be able to reference our User entity we created
  in our users service, we're using the @extends directive to say 
  that this type is an entity defined in another service, and we're 
  using the @key directive to say which field is the primary key of the 
  entity (in this case the id) and we're also using the
  @external directive to say that each of those fields come from an 
  entity declared in another service (the users service).
*/

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
}
