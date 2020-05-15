import { Resolvers } from '../generated';
import Query from './query';
import Mutation from './mutation';
import { User } from '@prisma/client';
import { ApolloContext } from '../../typings';

const resolvers: Resolvers & {
  User: { __resolveReference(user: User, ctx: ApolloContext): Promise<User> };
} = {
  Query,
  Mutation,
  User: {
    async __resolveReference(user, { prisma }) {
      const wantedUser = await prisma.user.findOne({ where: { id: user.id } });

      if (!wantedUser) {
        throw new Error('Could not resolve reference for User entity');
      }

      return wantedUser;
    },
  },
};

export default resolvers;
