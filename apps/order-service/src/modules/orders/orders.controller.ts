import type { OrdersService } from './orders.service';

export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  async createOrder(requestBody: any) {
    const { userId, amount, currency } = requestBody;
    if (!userId || typeof amount !== 'number' || !currency) {
      return {
        status: 400,
        body: {
          error: 'Invalid Input.',
        },
      };
    }
    const order = await this.orderService.createOrder({ userId, amount, currency });
    return {
      status: 201,
      body: order,
    };
  }

  async fetchOrder(orderId: string) {
    const order = await this.orderService.fetchOrder(orderId);
    if (!order) {
      return {
        status: 404,
        body: { error: 'Order not found' },
      };
    }

    return {
      status: 200,
      body: order,
    };
  }
}
