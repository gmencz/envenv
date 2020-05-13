import { ObjectType, Field, Directive } from 'type-graphql';
import Environment from '../../entities/Environment';
import EnvironmentMember from '../../entities/Environment/Member';

@ObjectType()
export default class Test {
  @Directive('@provides(fields: "id name members")')
  @Field(() => Environment)
  environment: Environment;

  @Directive('@provides(fields: "id environmentRole environment user")')
  @Field(() => EnvironmentMember)
  environmentMember: EnvironmentMember;
}
