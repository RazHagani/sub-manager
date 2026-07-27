import * as subscriptionRepository from '../repositories/subscription.repository.js';

export async function getAllSubscriptions(req, res) {
  try {
    const subscriptions = await subscriptionRepository.findAll();
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function createSubscription(req, res) {
    try {
      const newSubscription = await subscriptionRepository.create(req.body);
      res.status(201).json(newSubscription);
    } catch (error) {
      console.error('Error creating subscription:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }