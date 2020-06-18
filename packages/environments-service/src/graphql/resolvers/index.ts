import UserResolvers from './user';
import EnvironmentResolvers from './environment';
import EnvironmentMemberResolvers from './environmentMember';
import MutationResolvers from './mutation';
import { Resolvers } from '../generated';
import { resolvers as customScalars } from 'graphql-scalars';

const resolvers: Resolvers = {
  Mutation: MutationResolvers,
  Environment: EnvironmentResolvers,
  User: UserResolvers,
  EnvironmentMember: EnvironmentMemberResolvers,
  ...customScalars,
};

export default resolvers;
