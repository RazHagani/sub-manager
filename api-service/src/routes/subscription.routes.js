import { Router } from 'express';
import * as subscriptionController from '../controllers/subscription.controller.js';

const router = Router();

router.get('/', subscriptionController.getAllSubscriptions);
router.post('/', subscriptionController.createSubscription);

export default router;