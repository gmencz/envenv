import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Directive, ObjectType, Field, ID } from 'type-graphql';
import { Model } from '../../helpers/Model';
import EnvironmentMember from './Member';

@Entity('environments')
@Directive('@extends')
@Directive(`@key(fields: "id")`)
@ObjectType()
export default class Environment extends Model {
  @Directive('@external')
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Directive('@external')
  @Column('character varying', {
    nullable: false,
    length: 60,
  })
  @Field()
  name: string;

  @Directive('@external')
  @Field(() => [EnvironmentMember])
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
