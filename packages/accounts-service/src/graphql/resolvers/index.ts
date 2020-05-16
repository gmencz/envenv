import UserResolvers from './user';
import MutationResolvers from './mutation';
import QueryResolvers from './query';

const resolvers = {
  Query: QueryResolvers,
  Mutation: MutationResolvers,
  User: UserResolvers,
};

export default resolvers;
