import UserResolvers from './user';
import EnvironmentResolvers from './environment';
import EnvironmentMemberResolvers from './environmentMember';
import QueryResolvers from './query';
import MutationResolvers from './mutation';
import { Resolvers } from '../generated';

const resolvers: Resolvers = {
  Query: QueryResolvers,
  Mutation: MutationResolvers,
  Environment: EnvironmentResolvers,
  User: UserResolvers,
  EnvironmentMember: EnvironmentMemberResolvers,
};

export default resolvers;
