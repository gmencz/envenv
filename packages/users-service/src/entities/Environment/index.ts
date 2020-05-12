import { Entity, PrimaryColumn, OneToMany, Column } from 'typeorm';
import { Model } from '../../helpers/Model';
import EnvironmentMember from './Member';
import { Directive, Field, ID, ObjectType } from 'type-graphql';

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
  @Field()
  @Column('character varying', {
    nullable: false,
    length: 60,
  })
  name: string;

  @Directive('@external')
  @Field(() => [EnvironmentMember])
  members: EnvironmentMember[];
}
