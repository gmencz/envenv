import { registerEnumType } from 'type-graphql';

export enum QueryUserBy {
  username = 'username',
  id = 'id',
  email = 'email',
}

registerEnumType(QueryUserBy, {
  name: 'QueryUserBy',
  description: 'The property used to query the user by.',
});
