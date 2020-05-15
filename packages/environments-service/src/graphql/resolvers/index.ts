import { Resolvers } from '../generated';
import { Environment } from '@prisma/client';
import { ApolloContext } from '../../typings';
import __resolveReference from './environment/__resolveReference';
import Query from './query';
import resolveUsername from './user/resolveUsername';
import resolveEnvironments from './user/resolveEnvironments';
import resolveUser from './environmentMember/resolveUser';
import Mutation from './mutation';
import resolveOwner from './environment/resolveOwner';

const resolvers: Resolvers & {
  Environment: {
    __resolveReference(
      environment: Environment,
      ctx: ApolloContext
    ): Promise<Environment | null>;
  };
} = {
  Query,
  Mutation,
  Environment: {
    __resolveReference,
    owner: resolveOwner as any,
  },
  User: {
    username: resolveUsername,
    environments: resolveEnvironments,
  },
  EnvironmentMember: {
    user: resolveUser as any,
  },
};

export default resolvers;
