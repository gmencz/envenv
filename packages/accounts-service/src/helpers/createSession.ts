import { generate as generateUniqueId } from 'shortid';
import { ApolloError } from 'apollo-server-express';
import { Redis } from 'ioredis';
import { PrismaClient } from '@prisma/client';
import { encryptor } from './cryptr';

interface CreateSessionReturnType {
  csrfToken: string;
  sessionId: string;
}

export default async function createSession(
  userId: string | number,
  preferedRedisClient: Redis,
  sessionExpiryTime: string | number = process.env.SESSION_REDIS_EXPIRY!
): Promise<CreateSessionReturnType> {
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findOne({
      where: { id: userId.toString() },
      select: { role: true, id: true },
    });

    const sessionInfo = {
      sessionId: `${generateUniqueId()}${generateUniqueId()}`,
      csrfToken: `${generateUniqueId()}${generateUniqueId()}`,
      userId: user?.id,
      userRole: user?.role,
    };

    const encryptedSessionId = encryptor.encrypt(sessionInfo.sessionId);

    await preferedRedisClient.set(
      `session_${sessionInfo.sessionId}`,
      JSON.stringify({ ...sessionInfo }),
      'EX',
      Number(sessionExpiryTime)
    );

    return {
      csrfToken: sessionInfo.csrfToken,
      sessionId: encryptedSessionId,
    };
  } catch (error) {
    console.log(error);
    throw new ApolloError('Could not create session', '500', {
      errorCode: 'server_error',
    });
  } finally {
    await prisma.disconnect();
  }
}
