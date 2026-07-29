import { Queue } from 'bullmq';
import { redisConnection } from '../config/redis.js';

export const scanQueue = new Queue('scan', {
  connection: redisConnection,
});