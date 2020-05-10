import redisClient from '../helpers/redisClient';

afterAll(() => {
  redisClient.quit();
});
