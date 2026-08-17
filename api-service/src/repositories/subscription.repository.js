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

  export async function findById(id) {
    const result = await pool.query(
      'SELECT * FROM subscriptions WHERE id = $1',
      [id]
    );
  
    return result.rows[0];
  }

  export async function update(id, subscription) {
    const { name, price, currency, billing_cycle, next_renewal_date, auto_renew } = subscription;
  
    const result = await pool.query(
      `UPDATE subscriptions
       SET name = $1,
           price = $2,
           currency = $3,
           billing_cycle = $4,
           next_renewal_date = $5,
           auto_renew = $6,
           updated_at = NOW()
       WHERE id = $7
       RETURNING *`,
      [name, price, currency, billing_cycle, next_renewal_date, auto_renew, id]
    );
  
    return result.rows[0];
  }

  export async function remove(id) {
    const result = await pool.query(
      'DELETE FROM subscriptions WHERE id = $1 RETURNING *',
      [id]
    );
  
    return result.rows[0];
  }