import { Redis } from 'ioredis';

export interface RedisSession {
  sessionId: string;
  csrfToken: string;
  userId: string;
  userRole: string;
}

export default async function getSession(
  sessionId: string,
  preferedRedisClient: Redis
): Promise<RedisSession | null> {
  try {
    const redisResponse = await preferedRedisClient.get(`session_${sessionId}`);

    if (!redisResponse) {
      return null;
    }

    const sessionInfo = JSON.parse(
      Buffer.from(redisResponse, 'base64').toString()
    );

    return sessionInfo as RedisSession;
  } catch (error) {
    return null;
  }
}
