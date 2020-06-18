import UserResolvers from './user';
import MutationResolvers from './mutation';
import QueryResolvers from './query';
import { Resolvers } from '../generated';
import { resolvers as customScalars } from 'graphql-scalars';

const resolvers: Resolvers = {
  Query: QueryResolvers,
  Mutation: MutationResolvers,
  User: UserResolvers,
  ...customScalars,
};

export default resolvers;
