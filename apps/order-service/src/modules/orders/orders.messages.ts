import { ORDER_EVENTS_EXCHANGE } from '@shared-rabbit/utils';
import type { OrderCreatedEvent } from '@shared-types';
import type { Channel } from 'amqplib';

export class OrdersMessageBus {
  constructor(private readonly channel: Channel) {}

  async publishOrderCreated(event: OrderCreatedEvent): Promise<void> {
    const routingKey = 'order.created';
    const payload = Buffer.from(JSON.stringify(event));

    const published = await this.channel.publish(ORDER_EVENTS_EXCHANGE, routingKey, payload, {
      contentType: 'application/json',
      persistent: true,
      timestamp: Date.now(),
    });

    if (!published) console.warn('[order-service] publish buffer full for order.created');
  }
}
