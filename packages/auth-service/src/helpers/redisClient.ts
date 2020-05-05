import { createClient } from 'redis';

const redisClient = createClient({
  host: process.env.REDIS_HOST,
});

export default redisClient;
