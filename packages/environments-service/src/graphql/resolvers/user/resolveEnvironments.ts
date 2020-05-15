import { UserResolvers, User } from '../../generated';
import { ApolloContext } from '../../../typings';
import { ApolloError } from 'apollo-server-express';

const resolveEnvironments: UserResolvers['environments'] = async (
  user: User,
  __,
  { prisma }: ApolloContext
) => {
  try {
    const foundEnvironments = await prisma.environment.findMany({
      where: { ownerUserId: user.id },
    });

    return foundEnvironments as any;
  } catch (error) {
    console.log(error);
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
