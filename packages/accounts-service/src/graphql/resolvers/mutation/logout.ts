import { MutationResolvers, LogoutResult } from '../../generated';
import { ApolloError } from 'apollo-server-express';
import { encryptor } from '../../../helpers/cryptr';
import redisClient from '../../../helpers/redisClient';
import { Auth } from '../../../typings';

const logout: MutationResolvers['logout'] = async (
  _parent,
  _args,
  { auth, res, req }
): Promise<LogoutResult> => {
  try {
    if (!req.cookies.SessionID) {
      return {
        __typename: 'NoCurrentSession',
        message:
          "A session hasn't been started, therefore logging out is not possible.",
      };
    }

    const decryptedSessionId = encryptor.decrypt(req.cookies.SessionID);

    const deleteResult = await redisClient.del(`session_${decryptedSessionId}`);

    if (deleteResult !== 1) {
      return {
        __typename: 'NoCurrentSession',
        message:
          "A session hasn't been started or something went wrong on our side, therefore logging out is not possible.",
      };
    }

    res.clearCookie('SessionID');
    auth.isAuthenticated = false;
    auth.user = (null as unknown) as Auth['user'];
    return {
      __typename: 'SuccessfulLogout',
      performedAt: new Date(),
    };
  } catch (error) {
    if (error.message.toLowerCase().startsWith('unsupported state')) {
      res.clearCookie('SessionID');

      return {
        __typename: 'NoCurrentSession',
        message: 'The current session is invalid.',
      };
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

export default logout;
