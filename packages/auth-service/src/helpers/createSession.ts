import SessionResponse from '../graphqlShared/types/SessionResponse';
import redisClient from './redisClient';
import { generate as generateUniqueId } from 'shortid';
import { sign } from 'jsonwebtoken';
import { ApolloError } from 'apollo-server';

export default async function createSession(
  userId: string
): Promise<SessionResponse> {
  try {
    const sessionInfo = {
      sessionId: `${generateUniqueId()}${generateUniqueId()}`,
      csrfToken: `${generateUniqueId()}${generateUniqueId()}`,
      userId,
    };

    const signedSessionInfo = await new Promise((resolve, reject) => {
      sign(
        { ...sessionInfo },
        process.env.SESSION_INFO_SECRET as string,
        {
          expiresIn: Number(process.env.SESSION_REDIS_EXPIRY),
        },
        (error, jwt) => {
          if (error) {
            reject(error);
          }

          resolve(jwt);
        }
      );
    });

    redisClient.set(
      `session_${sessionInfo.sessionId}`,
      signedSessionInfo as string,
      'EX',
      Number(process.env.SESSION_REDIS_EXPIRY as string)
    );

    return {
      csrfToken: sessionInfo.csrfToken,
      sessionId: sessionInfo.sessionId,
    };
  } catch (error) {
    console.log(error);
    throw new ApolloError('Could not create session', '500', {
      errorCode: 'server_error',
    });
  }
}
