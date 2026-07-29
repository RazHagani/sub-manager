import pool from '../config/db.js';

export async function findRenewingSoon(days) {
  const result = await pool.query(
    `SELECT * FROM subscriptions
     WHERE next_renewal_date >= CURRENT_DATE
       AND next_renewal_date <= CURRENT_DATE + $1::int
     ORDER BY next_renewal_date`,
    [days]
  );

  return result.rows;
}