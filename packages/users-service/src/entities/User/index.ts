import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Model } from '../../helpers/Model';
import EnvironmentMember from '../Environment/Member';

@Entity('users')
export default class User extends Model {
  @PrimaryColumn()
  id: string;

  @Column('character varying', {
    nullable: false,
    default:
      'https://www.pinclipart.com/picdir/middle/157-1578186_user-profile-default-image-png-clipart.png',
  })
  picture: string;

  @Column('character varying', {
    default: 'none',
    nullable: false,
  })
  provider: string; // google, facebook, etc

  @Column('character varying', {
    nullable: false,
    unique: true,
    length: 30,
  })
  username: string;

  @Column('character varying', {
    nullable: false,
    unique: true,
    length: 60,
  })
  email: string;

  @Column('character varying', {
    nullable: false,
    length: 60,
  })
  name: string;

  @Column('character varying', {
    nullable: false,
    length: 255,
  })
  password: string;

  @Column('character varying', {
    nullable: false,
    length: 30,
    default: 'user',
  })
  role: string;

  @Column('timestamp without time zone', {
    nullable: true,
  })
  lastPasswordChange: Date;

  @OneToMany(
    () => EnvironmentMember,
    (environmentMember: EnvironmentMember) => environmentMember.user
  )
  membersOfEnvironments: EnvironmentMember[];
}

export async function resolveUserReference(
  reference: Pick<User, 'id'>
): Promise<User> {
  const users = await User.find();

  return users.find(u => u.id === reference.id) as User;
}
