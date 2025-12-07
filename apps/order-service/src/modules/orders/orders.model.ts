import type { OrderStatus, OrderDTO } from '@shared-types';

export interface OrderRecord {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  status: OrderStatus;
  created_at: Date;
  updated_at: Date;
}

export function toOrderDTO(row: OrderRecord): OrderDTO {
  return {
    id: row.id,
    userId: row.user_id,
    amount: row.amount,
    currency: row.currency,
    status: row.status,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}
