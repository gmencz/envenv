import { generate as generateUniqueId } from 'shortid';
import { sign } from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-express';
import { RedisClient } from 'redis';

interface CreateSessionReturnType {
  csrfToken: string;
  sessionId: string;
}

export default async function createSession(
  userId: string | number,
  preferedRedisClient: RedisClient,
  sessionSecret: string = process.env.SESSION_INFO_SECRET!,
  sessionExpiryTime: string | number = process.env.SESSION_REDIS_EXPIRY!
): Promise<CreateSessionReturnType> {
  try {
    const sessionInfo = {
      sessionId: `${generateUniqueId()}${generateUniqueId()}`,
      csrfToken: `${generateUniqueId()}${generateUniqueId()}`,
      userId,
    };

    const signedSessionInfo = await new Promise((resolve, reject) => {
      sign(
        { ...sessionInfo },
        sessionSecret,
        {
          expiresIn: Number(sessionExpiryTime),
        },
        (error, jwt) => {
          if (error) {
            reject(error);
          }

          resolve(jwt);
        }
      );
    });

    preferedRedisClient.set(
      `session_${sessionInfo.sessionId}`,
      signedSessionInfo as string,
      'EX',
      Number(sessionExpiryTime)
    );

    return {
      csrfToken: sessionInfo.csrfToken,
      sessionId: sessionInfo.sessionId,
    };
  } catch (error) {
    throw new ApolloError('Could not create session', '500', {
      errorCode: 'server_error',
    });
  }
}
