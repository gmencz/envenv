import { User } from '@prisma/client';
import redisClient from '../redisClient';
import generateRandomJitter from './generateRandomJitter';

export const getCachedUser = async (userId: string): Promise<User | null> => {
  const cachedEncodedUser = await redisClient.get(`user_${userId}`);

  if (!cachedEncodedUser) {
    return null;
  }

  const cachedUser = JSON.parse(
    Buffer.from(cachedEncodedUser, 'base64').toString()
  );

  return cachedUser;
};

export const cacheUser = async (user: User): Promise<void> => {
  const encodedUser = Buffer.from(JSON.stringify(user)).toString('base64');

  // Keep in mind EXPIRE key is seconds and not ms.
  await redisClient.set(
    `user_${user.id}`,
    encodedUser,
    'EX',
    604800 + generateRandomJitter(300, 900)
  );
};

export const evictCachedUser = async (userId: string): Promise<void> => {
  await redisClient.del(`${userId}`);
};
