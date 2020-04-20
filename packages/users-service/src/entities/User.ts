import { Field, ObjectType, Directive, ID } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Model } from '../helpers/Model';

@Entity('users')
@Directive(`@key(fields: "id")`)
@ObjectType()
export default class User extends Model {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
    length: 20,
  })
  name: string;

  @Field(() => String)
  @Column('character varying', {
    nullable: false,
    length: 40,
  })
  email: string;

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
    default: () => 'user',
  })
  role: string;

  @Field(() => Date)
  @Column('character varying', {
    nullable: false,
  })
  birthDate: Date;
}

export async function resolveUserReference(
  reference: Pick<User, 'id'>
): Promise<User> {
  const users = await User.find();

  return users.find(u => u.id === reference.id) as User;
}
