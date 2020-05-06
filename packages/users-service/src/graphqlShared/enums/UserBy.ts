import { registerEnumType } from 'type-graphql';

export enum QueryUserBy {
  username = 'username',
  id = 'id',
}

registerEnumType(QueryUserBy, {
  name: 'QueryUserBy',
  description: 'The user property used to query the user by.',
});
