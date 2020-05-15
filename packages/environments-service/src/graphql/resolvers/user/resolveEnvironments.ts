import { ApolloContext } from '../../../typings';
import { ApolloError } from 'apollo-server-express';
import { UserOperations } from '.';

const resolveEnvironments: UserOperations['resolveEnvironments'] = async (
  user,
  __,
  { prisma }: ApolloContext
) => {
  console.log(user);
  try {
    const foundEnvironments = await prisma.environment.findMany({
      where: { ownerUserId: user.id },
    });

    return foundEnvironments;
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

export default resolveEnvironments;
