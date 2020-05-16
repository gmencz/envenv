import Query from './query';
import Mutation from './mutation';
import __resolveReference from './user/__resolveReference';
import UserResolvers from './user';

const resolvers = {
  Query,
  Mutation,
  User: UserResolvers,
};

export default resolvers;
