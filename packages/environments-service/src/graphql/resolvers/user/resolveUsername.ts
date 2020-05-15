import { UserResolvers, User } from '../../generated';
import { request } from 'graphql-request';
import { ApolloError } from 'apollo-server-express';

const resolveUsername: UserResolvers['username'] = async (user: User) => {
  try {
    console.log(user);
    const findUserQuery = `
      query findUser($id: Int!) {
        findUser(id: $id) {
          username
        }
      }
    `;

    const data = await request(
      'http://dev-accounts-service:5005/graphql',
      findUserQuery,
      { id: user.id }
    );

    if (!data.findUser) {
      return null;
    }

    return data.findUser.username;
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

export default resolveUsername;
