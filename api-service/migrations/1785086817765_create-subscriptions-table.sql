-- Up Migration
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  currency VARCHAR(3) NOT NULL,
  billing_cycle VARCHAR(20) NOT NULL,
  next_renewal_date DATE NOT NULL,
  auto_renew BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Down Migration
DROP TABLE subscriptions;