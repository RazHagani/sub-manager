import { findRenewingSoon } from './repositories/subscription.repository.js';
import { notificationQueue } from './queues/notification.queue.js';

const DAYS_AHEAD = 3;

export async function runScan() {
  console.log('Scanner started, looking for subscriptions renewing soon...');

  const subscriptions = await findRenewingSoon(DAYS_AHEAD);

  console.log(`Found ${subscriptions.length} subscription(s) renewing in the next ${DAYS_AHEAD} days`);

  for (const subscription of subscriptions) {
    const renewalDate = new Date(subscription.next_renewal_date);
    const renewalKey = [
      renewalDate.getFullYear(),
      String(renewalDate.getMonth() + 1).padStart(2, '0'),
      String(renewalDate.getDate()).padStart(2, '0'),
    ].join('-');

    await notificationQueue.add(
      'renewal-reminder',
      {
        subscriptionId: subscription.id,
        name: subscription.name,
        nextRenewalDate: subscription.next_renewal_date,
      },
      {
        jobId: `reminder-${subscription.id}-${renewalKey}`,
      }
    );

    console.log(`Enqueued reminder for: ${subscription.name}`);
  }

  console.log('Scan finished, enqueued reminders.');

  return subscriptions.length;
}