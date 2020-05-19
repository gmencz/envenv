import { MutationOperations } from '.';
import { ApolloError } from 'apollo-server-express';
import createSession from '../../../helpers/createSession';
import redisClient from '../../../helpers/redisClient';

const loginWithExternalProvider: MutationOperations['loginWithExternalProvider'] = async (
  _,
  __,
  { prisma, req, res }
) => {
  try {
    if (!req.headers.cookie) {
      throw new ApolloError(
        `Something went wrong on our side, we're working on it!`,
        '500',
        {
          errorCode: 'server_error',
        }
      );
    }

    const cookies = JSON.parse(req.headers.cookie);
    if (!cookies.TemporaryUserId) {
      return {
        __typename: 'InvalidOrMissingUserIdentifier',
        message:
          'Cannot login, this was caused because of skipping the auth flow (user did not try to login with the desired provider)',
      };
    }

    const user = await prisma.user.findOne({
      where: { id: cookies.TemporaryUserId },
    });
    if (!user) {
      return {
        __typename: 'InvalidOrMissingUserIdentifier',
        message:
          'Cannot login, this was caused because that account is not registered with us, sign up instead',
      };
    }

    const newSession = await createSession(user.id, redisClient);

    res.cookie('SessionID', newSession.sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: Number(process.env.SESSION_REDIS_EXPIRY!),
    });

    res.clearCookie('TemporaryUserId');

    return {
      __typename: 'SuccessfulLogin',
      user: {
        email: user.email,
        id: user.id,
        name: user.name,
        password: user.password,
        provider: user.provider as any,
        role: user.role as any,
        username: user.username,
      },
      csrfToken: newSession.csrfToken,
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

export default loginWithExternalProvider;
