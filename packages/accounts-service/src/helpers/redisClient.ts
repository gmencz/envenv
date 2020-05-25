import Redis from 'ioredis';

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
});

export default redisClient;
