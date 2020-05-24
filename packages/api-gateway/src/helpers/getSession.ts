import { verify } from 'jsonwebtoken';
import { RedisClient } from 'redis';

export interface RedisSession {
  sessionId: string;
  csrfToken: string;
  userId: string;
}

export default async function getSession(
  sessionId: string,
  preferedRedisClient: RedisClient,
  sessionSecret: string = process.env.SESSION_INFO_SECRET!
): Promise<RedisSession | null> {
  try {
    const redisResponse = await new Promise((resolve, reject) => {
      preferedRedisClient.get(`session_${sessionId}`, (error, data) => {
        if (error) {
          reject(error);
        }

        resolve(data);
      });
    });

    if (!redisResponse) {
      return null;
    }

    const sessionEncoded = redisResponse as string;

    const sessionInfo = await new Promise((resolve, reject) => {
      verify(sessionEncoded, sessionSecret, (error, sessionInfo) => {
        if (error) {
          reject(error);
        }

        resolve(sessionInfo);
      });
    });

    return sessionInfo as RedisSession;
  } catch (error) {
    return null;
  }
}
