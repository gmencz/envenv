import { Redis } from 'ioredis';
import { encryptor } from './cryptr';

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
    const decryptedSessionId = encryptor.decrypt(sessionId);

    const redisResponse = await preferedRedisClient.get(
      `session_${decryptedSessionId}`
    );

    if (!redisResponse) {
      return null;
    }

    const sessionInfo = JSON.parse(redisResponse);
    return sessionInfo as RedisSession;
  } catch (error) {
    return null;
  }
}
