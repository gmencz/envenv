import { QueryOperations } from '.';
import { ApolloError } from 'apollo-server-express';

const findUser: QueryOperations['findUser'] = async (_, { id }, { prisma }) => {
  try {
    const user = await prisma.user.findOne({ where: { id } });

    return user;
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
