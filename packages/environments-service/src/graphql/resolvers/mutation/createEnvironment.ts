import { MutationResolvers } from '../../generated';
import { ApolloError } from 'apollo-server-express';
import { ApolloContext } from '../../../typings';

const createEnvironment: MutationResolvers['createEnvironment'] = async (
  _,
  { data },
  { prisma }: ApolloContext
) => {
  try {
    const environment = await prisma.environment.create({
      data: {
        name: data!.name,
        ownerUserId: data!.userCreatingEnvironmentId,
      },
    });

    console.log('createEnvironment operation');
    return {
      id: environment.id,
      name: environment.name,
      ownerUserId: environment.ownerUserId,
    } as any;
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
