import { Router } from 'express';
import * as subscriptionController from '../controllers/subscription.controller.js';
import { validateBody } from '../middlewares/validate.js';
import { subscriptionSchema } from '../validators/subscription.validator.js';

const router = Router();


router.get('/', subscriptionController.getAllSubscriptions);
router.post('/', validateBody(subscriptionSchema), subscriptionController.createSubscription);
router.get('/:id', subscriptionController.getSubscriptionById);
router.put('/:id', validateBody(subscriptionSchema), subscriptionController.updateSubscription);
router.delete('/:id', subscriptionController.deleteSubscription);

export default router;