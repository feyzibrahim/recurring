import { Channel, Connection } from "amqplib";

export const SendDataToQueue = async (
  channel: Channel,
  connection: Connection,
  queue: string,
  data: any
) => {
  try {
    if (!connection || !channel) {
      throw new Error("RabbitMQ connection or channel is not initialized.");
    }

    if (channel) {
      await channel.assertQueue(queue);
      const status = channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(data))
      );

      return status;
    } else {
      throw new Error("RabbitMQ channel is not initialized.");
    }
  } catch (error) {
    console.log(
      "file: rabbitmq.service.ts:48 -> RabbitMQService -> sendDataToQueue -> error",
      error
    );
    return false;
  }
};
