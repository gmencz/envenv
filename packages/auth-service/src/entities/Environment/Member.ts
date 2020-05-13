import { Directive, ObjectType, Field, ID } from 'type-graphql';
import User from '../User';
import Environment from '.';

@Directive('@extends')
@Directive(`@key(fields: "id")`)
@ObjectType()
export default class EnvironmentMember {
  @Directive('@external')
  @Field(() => ID)
  id: string;

  @Directive(`@external`)
  @Directive(
    `@provides(fields: "id username name email picture password role provider lastPasswordChange membersOfEnvironments")`
  )
  @Field(() => User)
  user: User;

  @Directive('@external')
  @Field()
  environmentRole: string;

  @Directive(`@external`)
  @Directive(`@provides(fields: "id name members")`)
  @Field(() => Environment)
  environment: Environment;
}
