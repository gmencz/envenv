import { RedisClient } from 'redis';

export interface RedisSession {
  sessionId: string;
  csrfToken: string;
  userId: string;
}

export default async function getSession(
  sessionId: string,
  preferedRedisClient: RedisClient
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

    const sessionInfo = JSON.parse(
      Buffer.from(sessionEncoded, 'base64').toString()
    );

    return sessionInfo as RedisSession;
  } catch (error) {
    return null;
  }
}
