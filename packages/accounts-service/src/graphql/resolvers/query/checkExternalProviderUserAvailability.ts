import { QueryOperations } from '.';
import { ApolloError } from 'apollo-server-express';

const checkExternalProviderUserAvailability: QueryOperations['checkExternalProviderUserAvailability'] = async (
  _,
  { externalProviderUserEmail },
  { prisma }
) => {
  try {
    const user = await prisma.user.findOne({
      where: { email: externalProviderUserEmail },
    });

    return !!user;
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

export default checkExternalProviderUserAvailability;
