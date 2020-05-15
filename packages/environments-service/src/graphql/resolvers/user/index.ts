import resolveEnvironments from './resolveEnvironments';
import { Environment } from '@prisma/client';
import { ApolloContext } from '../../../typings';

export interface ReferencedUserRoot {
  __typename: 'User';
  id: number;
}

export interface UserOperations {
  resolveEnvironments(
    root: ReferencedUserRoot,
    args: {},
    ctx: ApolloContext
  ): Promise<Environment[]>;
}

const UserResolvers: UserOperations = {
  resolveEnvironments,
};

export default UserResolvers;
