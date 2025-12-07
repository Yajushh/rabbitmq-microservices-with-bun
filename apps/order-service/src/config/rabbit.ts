import { loadEnv } from './env';
import type { Channel } from 'amqplib';
import { createChannel, ensureOrderEventsTopology } from '@shared-rabbit';

let publishChannel: Promise<Channel> | null = null;

export async function getPublishChannel(): Promise<Channel> {
  if (!publishChannel) {
    publishChannel = (async () => {
      const env = loadEnv();
      const channel = await createChannel({ url: env.RABBIT_URL });
      await ensureOrderEventsTopology(channel);
      return channel;
    })();
  }
  return publishChannel;
}
