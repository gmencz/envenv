import redisClient from '../helpers/redisClient';

afterAll(async () => {
  await redisClient.quit();
});
