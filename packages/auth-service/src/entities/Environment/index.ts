import { Directive, ObjectType, Field, ID } from 'type-graphql';
import EnvironmentMember from './Member';

@Directive('@extends')
@Directive(`@key(fields: "id")`)
@ObjectType()
export default class Environment {
  @Directive('@external')
  @Field(() => ID)
  id: string;

  @Directive('@external')
  @Field()
  name: string;

  @Directive(`@external`)
  @Directive(`
    @provides(fields: "id user environmentRole environment")
  `)
  @Field(() => [EnvironmentMember])
  members: EnvironmentMember[];
}
