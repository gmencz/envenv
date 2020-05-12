import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Directive, ObjectType, Field, ID } from 'type-graphql';
import { Model } from '../../helpers/Model';
import User from '../User';
import Environment from '.';

@Entity('environmentMembers')
@Directive(`@key(fields: "id")`)
@ObjectType()
export default class EnvironmentMember extends Model {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @JoinColumn({ name: 'id' })
  @Field(() => User)
  user: User;

  @Field()
  @Column('character varying', {
    default: 'member',
    nullable: false,
  })
  environmentRole: string;

  @ManyToOne(
    () => Environment,
    (environment: Environment) => environment.members
  )
  @JoinColumn({ name: 'id' })
  @Field(() => Environment)
  environment: Environment;
}

export async function resolveEnvironmentMemberReference(
  reference: Pick<EnvironmentMember, 'id'>
): Promise<EnvironmentMember> {
  const environmentMembers = await EnvironmentMember.find();

  return environmentMembers.find(
    environmentMember => environmentMember.id === reference.id
  ) as EnvironmentMember;
}
