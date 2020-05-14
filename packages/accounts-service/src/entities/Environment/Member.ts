import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Model } from '../../helpers/Model';
import User from '../User';
import Environment from '.';

@Entity('environmentMembers')
export default class EnvironmentMember extends Model {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User, (user: User) => user.membersOfEnvironments)
  @JoinColumn({ name: 'id' })
  user: User;

  @Column('character varying', {
    default: 'member',
    nullable: false,
  })
  environmentRole: string;

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
