import { toOrderDTO } from './orders.model';
import type { OrdersMessageBus } from './orders.messages';
import type { OrdersRepository } from './orders.repository';
import type { OrderCreatedEvent } from '@shared-types';

export class OrdersService {
  constructor(private readonly repo: OrdersRepository, private readonly bus: OrdersMessageBus) {}

  async createOrder(input: { userId: string; amount: number; currency: string }) {
    const orderRow = await this.repo.createOrder(input);
    const orderDTO = toOrderDTO(orderRow);
    const orderCreatedEvent: OrderCreatedEvent = {
      type: 'order.created',
      orderId: orderDTO.id,
      userId: orderDTO.userId,
      amount: orderDTO.amount,
      currency: orderDTO.currency,
      createdAt: orderDTO.createdAt,
    };
    await this.bus.publishOrderCreated(orderCreatedEvent);
    return orderDTO;
  }

  async fetchOrder(orderId: string) {
    const order = await this.repo.fetchOrderbyId(orderId);
    return order ? toOrderDTO(order) : null;
  }
}
