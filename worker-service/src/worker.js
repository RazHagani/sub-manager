import { Worker } from 'bullmq';
import { redisConnection } from './config/redis.js';

const worker = new Worker(
  'notifications',
  async (job) => {
    console.log('Received job:', job.id, job.data);
  },
  { connection: redisConnection }
);

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.log(`Job ${job.id} failed:`, err.message);
});

console.log('Worker is running and listening for jobs...');