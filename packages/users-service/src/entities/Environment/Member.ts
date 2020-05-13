import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Directive, ObjectType, Field, ID } from 'type-graphql';
import { Model } from '../../helpers/Model';
import User from '../User';
import Environment from '.';

@Entity('environmentMembers')
@Directive('@extends')
@Directive(`@key(fields: "id")`)
@ObjectType()
export default class EnvironmentMember extends Model {
  @Directive('@external')
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Directive('@external')
  @Field(() => User)
  @ManyToOne(() => User, (user: User) => user.membersOfEnvironments)
  @JoinColumn({ name: 'id' })
  user: User;

  @Directive('@external')
  @Field()
  @Column('character varying', {
    default: 'member',
    nullable: false,
  })
  environmentRole: string;

  @Directive('@external')
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
