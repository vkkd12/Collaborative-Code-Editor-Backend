import { createClient } from 'redis';
import redisConfig from '../config/redis.js';
import logger from './logger.js';

let client;

export async function getRedis() {
  if (client) return client;
  client = createClient({
    url: `redis://${redisConfig.host}:${redisConfig.port}`,
    password: redisConfig.password,
    database: redisConfig.db,
  });
  client.on('error', (err) => logger.error({ msg: 'Redis error', err }));
  await client.connect();
  return client;
}

export async function withRedis(fn) {
  const c = await getRedis();
  return fn(c);
}