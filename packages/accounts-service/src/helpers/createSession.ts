import { generate as generateUniqueId } from 'shortid';
import { ApolloError } from 'apollo-server-express';
import { RedisClient } from 'redis';

interface CreateSessionReturnType {
  csrfToken: string;
  sessionId: string;
}

export default async function createSession(
  userId: string | number,
  preferedRedisClient: RedisClient,
  sessionExpiryTime: string | number = process.env.SESSION_REDIS_EXPIRY!
): Promise<CreateSessionReturnType> {
  try {
    const sessionInfo = {
      sessionId: `${generateUniqueId()}${generateUniqueId()}`,
      csrfToken: `${generateUniqueId()}${generateUniqueId()}`,
      userId,
    };

    const signedSessionInfo = Buffer.from(
      JSON.stringify({ ...sessionInfo })
    ).toString('base64');

    await new Promise((res, rej) => {
      preferedRedisClient.set(
        `session_${sessionInfo.sessionId}`,
        signedSessionInfo,
        'EX',
        Number(sessionExpiryTime),
        (err, response) => {
          if (err) {
            rej(err);
          }

          res(response);
        }
      );
    });

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
