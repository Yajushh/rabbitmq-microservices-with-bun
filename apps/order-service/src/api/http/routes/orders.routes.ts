import type { OrdersController } from 'apps/order-service/src/modules/orders/orders.controller';

export async function createOrdersRouter(controller: OrdersController) {
  return async function handleOrders(req: Request): Promise<Response | null> {
    const url = new URL(req.url);
    const method = req.method.toUpperCase();

    if (method === 'POST' && url.pathname === '/orders') {
      const body = req.json();
      const res = await controller.createOrder(body);

      return new Response(JSON.stringify(res.body), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const match = url.pathname.match(/^\/orders\/([^/]+)$/);
    if (method === 'GET' && match) {
      const orderId = match[1]!;
      const res = await controller.fetchOrder(orderId);

      return new Response(JSON.stringify(res.body), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return null;
  };
}
