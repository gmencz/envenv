import { ApolloContext } from '../../../typings';
import { User } from '@prisma/client';
import __resolveReference from './__resolveReference';

export interface ReferencedUserRoot {
  __typename: 'User';
  id: number;
}

export interface UserOperations {
  __resolveReference(
    root: ReferencedUserRoot,
    ctx: ApolloContext
  ): Promise<User | null>;
}

const UserResolvers: UserOperations = {
  __resolveReference,
};

export default UserResolvers;
