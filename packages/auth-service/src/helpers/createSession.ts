import SessionResponse from '../graphqlShared/types/SessionResponse';
import redisClient from './redisClient';
import { generate as generateUniqueId } from 'shortid';

export default function createSession(userId: string): SessionResponse {
  const sessionInfo = {
    sessionId: `${generateUniqueId()}${generateUniqueId()}`,
    csrfToken: `${generateUniqueId()}${generateUniqueId()}`,
    userId,
  };

  redisClient.set(
    `session_${sessionInfo.sessionId}`,
    JSON.stringify(sessionInfo),
    'EX',
    Number(process.env.SESSION_REDIS_EXPIRY as string)
  );

  return {
    csrfToken: sessionInfo.csrfToken,
    sessionId: sessionInfo.sessionId,
  };
}
