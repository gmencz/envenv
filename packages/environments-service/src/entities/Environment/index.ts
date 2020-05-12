import { Entity, PrimaryColumn, OneToMany, Column } from 'typeorm';
import { Directive, ObjectType, Field, ID } from 'type-graphql';
import { Model } from '../../helpers/Model';
import EnvironmentMember from './Member';

@Entity('environments')
@Directive(`@key(fields: "id")`)
@ObjectType()
export default class Environment extends Model {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Column('character varying', {
    nullable: false,
    length: 60,
  })
  @Field()
  name: string;

  @Field(() => [EnvironmentMember])
  @OneToMany(
    () => EnvironmentMember,
    (environmentMember: EnvironmentMember) => environmentMember.environment
  )
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
