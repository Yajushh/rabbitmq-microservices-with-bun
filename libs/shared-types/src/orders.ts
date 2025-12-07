export type OrderStatus = 'PENDING_PAYMENT' | 'PAID' | 'CANCELLED';

export interface OrderCreatedEvent {
  type: 'order.created';
  orderId: string;
  userId: string;
  amount: number;
  currency: string;
  createdAt: string;
}

export interface OrderDTO {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
