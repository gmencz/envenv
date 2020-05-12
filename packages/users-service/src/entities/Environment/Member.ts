import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Model } from '../../helpers/Model';
import User from '../User';
import Environment from '.';
import { Directive, ObjectType, Field, ID } from 'type-graphql';

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
