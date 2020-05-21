import { ApolloContext } from '../../../typings';
import { ApolloError } from 'apollo-server-express';
import { Environment } from '@prisma/client';
import { QueryOperations } from './index';

const getEnvironments: QueryOperations['getEnvironments'] = async (
  _,
  __,
  { prisma }: ApolloContext
): Promise<Environment[]> => {
  try {
    const environments = await prisma.environment.findMany();

    return environments;
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

export default getEnvironments;
