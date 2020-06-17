import UserResolvers from './user';
import EnvironmentResolvers from './environment';
import EnvironmentMemberResolvers from './environmentMember';
import MutationResolvers from './mutation';
import { Resolvers } from '../generated';
import { Integer, Str } from '@envenv/common';

const resolvers: Resolvers = {
  Mutation: MutationResolvers,
  Environment: EnvironmentResolvers,
  User: UserResolvers,
  EnvironmentMember: EnvironmentMemberResolvers,
  Integer,
  Str,
};

export default resolvers;
