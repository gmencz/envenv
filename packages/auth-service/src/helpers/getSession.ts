import redisClient from './redisClient';

export interface RedisSession {
  sessionId: string;
  csrfToken: string;
  userId: string;
}

export default async function getSession(
  sessionId: string
): Promise<RedisSession | null> {
  try {
    const redisResponse = await new Promise((resolve, reject) => {
      redisClient.get(`session_${sessionId}`, (error, data) => {
        if (error) {
          reject(error);
        }

        resolve(data);
      });
    });

    if (!redisResponse) {
      return null;
    }

    const sessionInfo = JSON.parse(redisResponse as string) as RedisSession;

    return sessionInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
}
