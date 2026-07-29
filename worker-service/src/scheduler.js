import { scanQueue } from './queues/scan.queue.js';

await scanQueue.upsertJobScheduler(
  'daily-scan',
  { pattern: '0 8 * * *' },
  {
    name: 'scan',
  }
);

console.log('Scheduler registered: daily scan at 08:00.');

process.exit(0);