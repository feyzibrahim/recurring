import { connectRabbitMq, channel } from "./rabbitmqConnection";

export const sendDataToQueue = async (queue: string, data: any) => {
  try {
    if (!channel) await connectRabbitMq();

    await channel.assertQueue(queue);

    const ddd = channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    console.log("🚀 ~ sendDataToQueue ~ data:", ddd);
  } catch (error) {
    console.log("🚀 ~ sendDataToQueue ~ error:", error);
  }
};
