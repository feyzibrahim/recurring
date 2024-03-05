import { injectable } from "inversify";
import amqp, { Channel, Connection } from "amqplib";
import { SendDataToQueue } from "./functions/SendDataToQueue";

@injectable()
export class RabbitMQService {
  private connection!: Connection;
  private channel!: Channel;

  async connect() {
    const rabbitmq_url = process.env.RABBITMQ_URL || "";
    this.connection = await amqp.connect(rabbitmq_url);
    this.channel = await this.connection.createChannel();
    console.log("Successfully Connected to RabbitMQ");
  }

  async sendDataToQueue(queue: string, data: any) {
    SendDataToQueue(this.channel, this.connection, queue, data);
  }
}
