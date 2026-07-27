import pool from '../config/db.js';

export async function findAll() {
  const result = await pool.query('SELECT * FROM subscriptions ORDER BY id');
  return result.rows;
}

export async function create(subscription) {
    const { name, price, currency, billing_cycle, next_renewal_date, auto_renew } = subscription;
  
    const result = await pool.query(
      `INSERT INTO subscriptions (name, price, currency, billing_cycle, next_renewal_date, auto_renew)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, price, currency, billing_cycle, next_renewal_date, auto_renew]
    );
  
    return result.rows[0];
  }