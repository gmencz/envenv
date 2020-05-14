import { Entity, PrimaryColumn, OneToMany, Column } from 'typeorm';
import { Model } from '../../helpers/Model';
import EnvironmentMember from './Member';

@Entity('environments')
export default class Environment extends Model {
  @PrimaryColumn()
  id: string;

  @Column('character varying', {
    nullable: false,
    length: 60,
  })
  name: string;

  @OneToMany(
    () => EnvironmentMember,
    (environmentMember: EnvironmentMember) => environmentMember.environment
  )
  members: EnvironmentMember[];
}
