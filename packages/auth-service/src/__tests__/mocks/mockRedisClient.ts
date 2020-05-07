import { createClient } from 'redis-mock';

const mockRedisClient = createClient({
  host: process.env.REDIS_HOST,
});

export default mockRedisClient;
