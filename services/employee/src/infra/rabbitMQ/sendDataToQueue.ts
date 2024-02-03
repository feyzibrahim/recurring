import { connectRabbitMq, channel } from "./rabbitmqConnection";

export const sendDataToQueue = async (queue: string, data: any) => {
  try {
    if (!channel) await connectRabbitMq();

    await channel.assertQueue(queue);

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  } catch (error) {
    console.log("🚀 ~ sendDataToQueue ~ error:", error);
  }
};
