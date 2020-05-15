import { Resolvers } from '../generated';
import Query from './query';
import Mutation from './mutation';
import { User } from '@prisma/client';
import { ApolloContext } from '../../typings';
import __resolveReference from './user/__resolveReference';

const resolvers: Resolvers & {
  User: {
    __resolveReference(user: User, ctx: ApolloContext): Promise<User | null>;
  };
} = {
  Query,
  Mutation,
  User: {
    __resolveReference,
  },
};

export default resolvers;
