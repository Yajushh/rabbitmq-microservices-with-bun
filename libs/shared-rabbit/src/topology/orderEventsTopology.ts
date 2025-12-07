import type { Channel } from 'amqplib';
import { ORDER_EVENTS_EXCHANGE, ORDER_EVENTS_EXCHANGE_TYPE } from '../utils';

const exchange = ORDER_EVENTS_EXCHANGE;
const exchangeType = ORDER_EVENTS_EXCHANGE_TYPE;

export async function ensureOrderEventsTopology(channel: Channel) {
  await channel.assertExchange(exchange, exchangeType, { durable: false });
}
