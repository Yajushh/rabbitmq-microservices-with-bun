import type { Channel, ChannelModel } from 'amqplib';
import { connect } from 'amqplib';

export interface RabbitConfig {
  url: string;
}

let connection: ChannelModel | null = null;

export async function connectRabbitMQ(config: RabbitConfig): Promise<ChannelModel> {
  if (connection) return connection;
  connection = await connect(config.url);

  connection.on('error', (err) => {
    console.error(`RabbitMQ connection failed with error: ${err}`);
    connection = null;
  });
  connection.on('close', () => {
    console.warn('RabbitMQ connection closed.');
    connection = null;
  });
  return connection;
}

export async function createChannel(config: RabbitConfig): Promise<Channel> {
  const conn = await connectRabbitMQ(config);
  const channel = await conn.createChannel();
  return channel;
}
