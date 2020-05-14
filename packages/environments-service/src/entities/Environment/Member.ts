import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Model } from '../../helpers/Model';
import User from '../User';
import Environment from '.';

@Entity('environmentMembers')
export default class EnvironmentMember extends Model {
  @PrimaryColumn()
  id: string;

  @JoinColumn({ name: 'id' })
  user: User;

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
  environment: Environment;
}
