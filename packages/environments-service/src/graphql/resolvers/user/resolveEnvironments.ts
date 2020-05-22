import { ApolloContext } from '../../../typings';
import { ApolloError } from 'apollo-server-express';
import { UserResolvers, Environment } from '../../generated';

const resolveEnvironments: UserResolvers['environments'] = async (
  user,
  __,
  { prisma }: ApolloContext
) => {
  try {
    const foundEnvironments = await prisma.environment.findMany({
      where: { ownerUserId: user.id },
    });

    return (foundEnvironments as unknown) as Environment[];
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
