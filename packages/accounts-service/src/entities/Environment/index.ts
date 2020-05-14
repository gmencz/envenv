import { Entity, PrimaryColumn, Column } from 'typeorm';
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

  members: EnvironmentMember[];
}

export async function resolveEnvironmentReference(
  reference: Pick<Environment, 'id'>
): Promise<Environment> {
  const environments = await Environment.find();

  return environments.find(
    environment => environment.id === reference.id
  ) as Environment;
}
