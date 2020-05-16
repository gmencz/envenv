import { ApolloContext } from '../../../typings';
import { User } from '@prisma/client';
import __resolveReference from './__resolveReference';
import { UserResolvers } from '../../generated';

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

const UserResolvers: {
  [T in keyof UserResolvers]: UserOperations[keyof UserOperations];
} = {
  ['__resolveReference' as keyof UserResolvers]: __resolveReference,
};

export default UserResolvers;
