import { ApolloError } from 'apollo-server-express';
import { MutationResolvers, Environment } from '../../generated';

const createEnvironment: MutationResolvers['createEnvironment'] = async (
  _,
  { data },
  { prisma }
) => {
  try {
    const environment = await prisma.environment.create({
      data: {
        name: data.name,
        ownerUserId: data.userCreatingEnvironmentId,
      },
    });

    return ({
      id: environment.id,
      name: environment.name,
      ownerUserId: environment.ownerUserId,
    } as unknown) as Environment;
  } catch (error) {
    if (error instanceof ApolloError) {
      throw error;
    }

    return new ApolloError(
      `Something went wrong on our side, we're working on it!`,
      '500',
      {
        errorCode: 'server_error',
      }
    );
  }
};

export default createEnvironment;
