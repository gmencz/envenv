import UserResolvers from './user';
import EnvironmentResolvers from './environment';
import EnvironmentMemberResolvers from './environmentMember';
import QueryResolvers from './query';
import MutationResolvers from './mutation';
import __resolveReference from './environment/__resolveReference';
import { Resolvers } from '../generated';

const resolvers: {
  [T in keyof Resolvers]:
    | typeof QueryResolvers
    | typeof MutationResolvers
    | typeof EnvironmentResolvers
    | typeof UserResolvers
    | typeof EnvironmentMemberResolvers;
} = {
  Query: QueryResolvers,
  Mutation: MutationResolvers,
  Environment: EnvironmentResolvers,
  User: UserResolvers,
  EnvironmentMember: EnvironmentMemberResolvers,
};

export default resolvers;
