import express from 'express';
import subscriptionRoutes from './routes/subscription.routes.js';

const app = express();

app.use(express.json());

app.use('/api/subscriptions', subscriptionRoutes);

export default app;