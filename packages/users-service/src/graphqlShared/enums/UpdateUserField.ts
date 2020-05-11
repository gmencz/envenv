import { registerEnumType } from 'type-graphql';

export enum UpdateUserField {
  username = 'username',
  email = 'email',
  lastPasswordChange = 'lastPasswordChange',
  role = 'role',
  password = 'password',
  name = 'name',
  picture = 'picture',
}

registerEnumType(UpdateUserField, {
  name: 'UpdateUserField',
  description: `The user's property which is going to be updated`,
});
