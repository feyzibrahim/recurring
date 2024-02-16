import { inject, injectable } from "inversify";
import amqp, { Channel, Connection } from "amqplib";
import { EmployeeAdapterInterface } from "../../interface/employee/EmployeeAdapterInterface";
import { TYPES } from "../../constants/types/types";
import { consumeMessages } from "./functions/ConsumeMessages";
import { SendDataToQueue } from "./functions/SendDataToQueue";

@injectable()
export class RabbitMQService {
  private connection!: Connection;
  private channel!: Channel;
  private userAdapter: EmployeeAdapterInterface;

  constructor(
    @inject(TYPES.EmployeeAdapterInterface)
    userAdapter: EmployeeAdapterInterface
  ) {
    this.userAdapter = userAdapter;
  }

  async connect() {
    const rabbitmq_url = process.env.RABBITMQ_URL || "";
    this.connection = await amqp.connect(rabbitmq_url);
    this.channel = await this.connection.createChannel();
    console.log("Successfully Connected to RabbitMQ");
  }

  async consumeMessages(queue: string) {
    consumeMessages(this.channel, queue, this.userAdapter);
  }

  async sendDataToQueue(queue: string, data: any) {
    SendDataToQueue(this.channel, this.connection, queue, data);
  }
}
