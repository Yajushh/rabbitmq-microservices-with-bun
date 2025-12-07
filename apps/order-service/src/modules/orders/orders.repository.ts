import { Pool } from 'pg';
import { v4 as uuidV4 } from 'uuid';
import type { OrderRecord } from './orders.model';

export class OrdersRepository {
  constructor(private readonly pool: Pool) {}

  async createOrder(params: {
    userId: string;
    amount: number;
    currency: string;
  }): Promise<OrderRecord> {
    const orderId = uuidV4();
    const currentTime = new Date();
    const status = 'PENDING_PAYMENT';

    const query = `
          INSERT INTO orders (id, user_id, amount, currency, status, created_at, updated_at)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING id, user_id, amount, currency, status, created_at, updated_at
        `;
    const values = [
      orderId,
      params.userId,
      params.amount,
      params.currency,
      status,
      currentTime,
      currentTime,
    ];
    const result = await this.pool.query<OrderRecord>(query, values);
    return result.rows[0]!;
  }

  async fetchOrderbyId(orderId: string): Promise<OrderRecord | null> {
    const query = `
      SELECT * FROM orders
      WHERE id = $1
    `;
    const result = await this.pool.query<OrderRecord>(query, [orderId]);
    return result.rows[0] ?? null;
  }
}
