import { Field, ObjectType, Directive, ID } from 'type-graphql';
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Model } from '../../helpers/Model';

@Entity('users')
@Directive(`@key(fields: "id")`)
@ObjectType()
export default class User extends Model {
  @Field(() => ID)
  @PrimaryColumn()
  id: string;

  @Field(() => String)
  @Column('character varying', {
    nullable: false,
    default:
      'https://www.pinclipart.com/picdir/middle/157-1578186_user-profile-default-image-png-clipart.png',
  })
  picture: string;

  @Field(() => String)
  @Column('character varying', {
    default: 'none',
    nullable: false,
  })
  provider: string; // google, facebook, etc

  @Field(() => String)
  @Column('character varying', {
    nullable: false,
    unique: true,
    length: 30,
  })
  username: string;

  @Field(() => String)
  @Column('character varying', {
    nullable: false,
    length: 60,
  })
  name: string;

  @Field(() => String)
  @Column('character varying', {
    nullable: false,
    length: 255,
  })
  password: string;

  @Field(() => String)
  @Column('character varying', {
    nullable: false,
    length: 30,
    default: 'user',
  })
  role: string;
}

export async function resolveUserReference(
  reference: Pick<User, 'id'>
): Promise<User> {
  const users = await User.find();

  return users.find(u => u.id === reference.id) as User;
}
