import UserResolvers from './user';
import MutationResolvers from './mutation';
import QueryResolvers from './query';
import { Resolvers } from '../generated';

const resolvers: {
  [T in keyof Resolvers]:
    | typeof QueryResolvers
    | typeof MutationResolvers
    | typeof UserResolvers;
} = {
  Query: QueryResolvers,
  Mutation: MutationResolvers,
  User: UserResolvers,
};

export default resolvers;
