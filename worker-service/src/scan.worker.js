import { Worker } from 'bullmq';
import { redisConnection } from './config/redis.js';
import { runScan } from './scanner.js';

const scanWorker = new Worker(
  'scan',
  async (job) => {
    console.log('Scan job received, running scan...');
    const count = await runScan();
    console.log(`Scan job done, enqueued ${count} reminder(s).`);
  },
  { connection: redisConnection }
);

scanWorker.on('completed', (job) => {
  console.log(`Scan job ${job.id} completed`);
});

scanWorker.on('failed', (job, err) => {
  console.log(`Scan job ${job.id} failed:`, err.message);
});

console.log('Scan worker is running and listening for scan jobs...');