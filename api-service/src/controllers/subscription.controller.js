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

  export async function getSubscriptionById(req, res) {
    try {
      const subscription = await subscriptionRepository.findById(req.params.id);
  
      if (!subscription) {
        return res.status(404).json({ error: 'Subscription not found' });
      }
  
      res.status(200).json(subscription);
    } catch (error) {
      console.error('Error fetching subscription:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  export async function updateSubscription(req, res) {
    try {
      const updated = await subscriptionRepository.update(req.params.id, req.body);
  
      if (!updated) {
        return res.status(404).json({ error: 'Subscription not found' });
      }
  
      res.status(200).json(updated);
    } catch (error) {
      console.error('Error updating subscription:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  export async function deleteSubscription(req, res) {
    try {
      const deleted = await subscriptionRepository.remove(req.params.id);
  
      if (!deleted) {
        return res.status(404).json({ error: 'Subscription not found' });
      }
  
      res.status(200).json({ message: 'Subscription deleted', subscription: deleted });
    } catch (error) {
      console.error('Error deleting subscription:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }