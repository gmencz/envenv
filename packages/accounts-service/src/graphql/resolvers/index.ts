import UserResolvers from './user';
import MutationResolvers from './mutation';
import QueryResolvers from './query';
import { Resolvers } from '../generated';

const resolvers: Resolvers = {
  Query: QueryResolvers,
  Mutation: MutationResolvers,
  User: UserResolvers,
};

export default resolvers;
