import redisClient from './redisClient';
import { verify } from 'jsonwebtoken';
import SessionResponse from '../graphqlShared/types/SessionResponse';

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

    const sessionEncoded = redisResponse as string;

    const sessionInfo = await new Promise((resolve, reject) => {
      verify(
        sessionEncoded,
        process.env.SESSION_INFO_SECRET as string,
        (error, sessionInfo) => {
          if (error) {
            reject(error);
          }

          resolve(sessionInfo);
        }
      );
    });

    return sessionInfo as RedisSession;
  } catch (error) {
    console.log(error);
    return null;
  }
}
