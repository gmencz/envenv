import { promisify } from 'util';
import { User } from '@prisma/client';
import redisClient from '../redisClient';

export const getCachedUser = async (userId: string): Promise<User | null> => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const getKey = promisify(redisClient.get).bind(redisClient);
  const cachedEncodedUser = await getKey(`user_${userId}`);

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

  await new Promise((resolve, reject) => {
    redisClient.set(
      `user_${user.id}`,
      encodedUser,
      'EX',
      3600000,
      (error, response) => {
        if (error) {
          reject(error);
        }

        resolve(response);
      }
    );
  });
};

export const invalidateUser = async (userId: string): Promise<void> => {
  await new Promise((resolve, reject) => {
    redisClient.del(`user_${userId}`, (error, response) => {
      if (error) {
        reject(error);
      }

      resolve(response);
    });
  });
};
