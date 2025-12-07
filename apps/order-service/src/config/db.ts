import { Pool } from 'pg';
import { loadEnv } from './env';

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (pool) return pool;

  const env = loadEnv();

  pool = new Pool({
    host: env.PG_HOST,
    port: Number(env.PG_PORT),
    user: env.PG_USER,
    password: env.PG_PASSWORD,
    database: env.PG_DATABASE,
    max: 10,
  });

  pool.on('error', (err) => {
    console.error('[Postgres] pool error in order-service', err);
  });

  return pool;
}
