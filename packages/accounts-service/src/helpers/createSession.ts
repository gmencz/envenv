import { generate as generateUniqueId } from 'shortid';
import { ApolloError } from 'apollo-server-express';
import { Redis } from 'ioredis';
import { PrismaClient } from '@prisma/client';

interface CreateSessionReturnType {
  csrfToken: string;
  sessionId: string;
}

export default async function createSession(
  userId: string | number,
  preferedRedisClient: Redis,
  sessionExpiryTime: string | number = process.env.SESSION_REDIS_EXPIRY!
): Promise<CreateSessionReturnType> {
  try {
    const prisma = new PrismaClient();
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

    const signedSessionInfo = Buffer.from(
      JSON.stringify({ ...sessionInfo })
    ).toString('base64');

    await preferedRedisClient.set(
      `session_${sessionInfo.sessionId}`,
      signedSessionInfo,
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
