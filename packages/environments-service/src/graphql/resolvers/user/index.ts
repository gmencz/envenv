import resolveEnvironments from './resolveEnvironments';
import { Environment } from '@prisma/client';
import { ApolloContext } from '../../../typings';
import { UserResolvers } from '../../generated';

export interface ReferencedUserRoot {
  __typename: 'User';
  id: string;
}

export interface UserOperations {
  resolveEnvironments(
    root: ReferencedUserRoot,
    args: {},
    ctx: ApolloContext
  ): Promise<Environment[]>;
}

const UserResolvers: {
  [T in keyof UserResolvers]: UserOperations[keyof UserOperations];
} = {
  environments: resolveEnvironments,
};

export default UserResolvers;
