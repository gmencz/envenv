import { QueryResolvers, User } from '../../generated';
import { ApolloContext } from '../../../typings';
import { ApolloError } from 'apollo-server-express';

const findUser: QueryResolvers['findUser'] = async (
  _,
  { id },
  { prisma }: ApolloContext
): Promise<User | null> => {
  try {
    const user = await prisma.user.findOne({ where: { id } });

    if (!user) {
      return null;
    }

    return {
      email: user.email,
      id: user.id,
      name: user.name,
      password: user.password,
      provider: user.provider as any,
      role: user.role as any,
      username: user.username,
    };
  } catch (error) {
    if (error instanceof ApolloError) {
      throw error;
    }

    throw new ApolloError(
      `Something went wrong on our side, we're working on it!`,
      '500',
      {
        errorCode: 'server_error',
      }
    );
  }
};

export default findUser;
