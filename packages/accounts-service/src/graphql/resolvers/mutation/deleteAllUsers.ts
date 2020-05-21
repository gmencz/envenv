import { MutationOperations } from '.';
import { ApolloError } from 'apollo-server-express';

const deleteAllUsers: MutationOperations['deleteAllUsers'] = async (
  _,
  __,
  { prisma }
) => {
  try {
    if (process.env.NODE_ENV !== 'test') {
      return {
        __typename: 'NotInTestingEnvironment',
        message:
          "Can't execute this operation, this is only available for testing purposes like cleaning up before tests.",
      };
    }

    const deleteOperation = await prisma.user.deleteMany({});

    return {
      __typename: 'SuccessfulRemoval',
      count: deleteOperation.count,
    };
  } catch (error) {
    throw new ApolloError(
      `Something went wrong on our side, we're working on it!`,
      '500',
      {
        errorCode: 'server_error',
      }
    );
  }
};

export default deleteAllUsers;
