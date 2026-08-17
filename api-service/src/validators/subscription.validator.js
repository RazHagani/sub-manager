import { z } from 'zod';

export const subscriptionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().int('Price must be an integer').nonnegative('Price cannot be negative'),
  currency: z.enum(['ILS', 'USD']),
  billing_cycle: z.enum(['monthly', 'yearly']),
  next_renewal_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  auto_renew: z.boolean(),
});