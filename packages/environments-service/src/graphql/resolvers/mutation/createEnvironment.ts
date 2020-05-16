import { ApolloError } from 'apollo-server-express';
import { MutationOperations } from '.';

const createEnvironment: MutationOperations['createEnvironment'] = async (
  _,
  { data },
  { prisma }
) => {
  try {
    const environment = await prisma.environment.create({
      data: {
        name: data!.name,
        ownerUserId: data!.userCreatingEnvironmentId,
      },
    });

    return {
      id: environment.id,
      name: environment.name,
      ownerUserId: environment.ownerUserId,
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

export default createEnvironment;
