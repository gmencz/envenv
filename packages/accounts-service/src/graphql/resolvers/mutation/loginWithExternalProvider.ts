import { ApolloError } from 'apollo-server-express';
import createSession from '../../../helpers/createSession';
import redisClient from '../../../helpers/redisClient';
import {
  MutationResolvers,
  LoginWithExternalProviderResult,
} from '../../generated';

const loginWithExternalProvider: MutationResolvers['loginWithExternalProvider'] = async (
  _,
  __,
  { prisma, req, res }
): Promise<LoginWithExternalProviderResult> => {
  try {
    if (!req.cookies.TemporaryUserID) {
      return {
        __typename: 'SkippedOAuthFlow',
        message: `Can't login with an external provider without going through the oauth flow`,
      };
    }

    const decodedID = Buffer.from(
      req.cookies.TemporaryUserID as string,
      'base64'
    ).toString();

    const user = await prisma.user.findOne({
      where: { id: decodedID },
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

    res.clearCookie('TemporaryUserID');

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
