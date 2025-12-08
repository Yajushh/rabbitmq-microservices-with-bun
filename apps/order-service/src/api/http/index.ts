import { serve } from 'bun';
import { getDbPool } from '../../config/db';
import { loadEnv } from '../../config/env';
import { getPublishChannel } from '../../config/rabbit';
import { OrdersController } from '../../modules/orders/orders.controller';
import { OrdersMessageBus } from '../../modules/orders/orders.messages';
import { OrdersRepository } from '../../modules/orders/orders.repository';
import { OrdersService } from '../../modules/orders/orders.service';
import { createOrdersRouter } from './routes/orders.routes';

export async function startHTTPServer() {
  const env = loadEnv();
  const pool = getDbPool();
  const channel = await getPublishChannel();

  const repo = new OrdersRepository(pool);
  const bus = new OrdersMessageBus(channel);
  const service = new OrdersService(repo, bus);
  const controller = new OrdersController(service);
  const ordersRouter = await createOrdersRouter(controller);

  serve({
    port: Number(env.PORT),
    fetch: async (req) => {
      const url = new URL(req.url);

      if (url.pathname.startsWith('/orders')) {
        const res = await ordersRouter(req);
        if (res) return res;
      }

      if (url.pathname === '/health') {
        return new Response(JSON.stringify({ status: 'ok' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response('Not Found', { status: 404 });
    },
  });
  console.log(`[order-service] HTTP listening on ${env.PORT}`);
}
