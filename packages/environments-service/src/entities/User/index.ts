import { Field, ObjectType, Directive, ID } from 'type-graphql';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Model } from '../../helpers/Model';
import EnvironmentMember from '../Environment/Member';

@Entity('users')
@Directive('@extends')
@Directive(`@key(fields: "id")`)
@ObjectType()
export default class User extends Model {
  @Directive('@external')
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Directive('@external')
  @Field(() => String)
  @Column('character varying', {
    nullable: false,
    default:
      'https://www.pinclipart.com/picdir/middle/157-1578186_user-profile-default-image-png-clipart.png',
  })
  picture: string;

  @Directive('@external')
  @Field(() => String)
  @Column('character varying', {
    default: 'none',
    nullable: false,
  })
  provider: string; // google, facebook, etc

  @Directive('@external')
  @Field(() => String)
  @Column('character varying', {
    nullable: false,
    unique: true,
    length: 30,
  })
  username: string;

  @Directive('@external')
  @Field(() => String)
  @Column('character varying', {
    nullable: false,
    unique: true,
    length: 60,
  })
  email: string;

  @Directive('@external')
  @Field(() => String)
  @Column('character varying', {
    nullable: false,
    length: 60,
  })
  name: string;

  @Directive('@external')
  @Field(() => String)
  @Column('character varying', {
    nullable: false,
    length: 255,
  })
  password: string;

  @Directive('@external')
  @Field(() => String)
  @Column('character varying', {
    nullable: false,
    length: 30,
    default: 'user',
  })
  role: string;

  @Directive('@external')
  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', {
    nullable: true,
  })
  lastPasswordChange: Date;

  @Directive('@external')
  @Field(() => [EnvironmentMember])
  membersOfEnvironments: EnvironmentMember[];
}
