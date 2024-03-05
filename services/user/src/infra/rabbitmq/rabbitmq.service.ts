import { inject, injectable } from "inversify";
import amqp, { Channel, Connection } from "amqplib";
import { UserAdapterInterface } from "../../interface/user/UserAdapterInterface";
import { TYPES } from "../../constants/types/types";
import { consumeMessages } from "./functions/ConsumeMessages";
import { SendDataToQueue } from "./functions/SendDataToQueue";
import { OrganizationAdapterInterface } from "../../interface/organization/OrganizationAdapterInterface";
import { consumeSubscriptionUpdates } from "./functions/consumeSubscriptionUpdates";

@injectable()
export class RabbitMQService {
  private connection!: Connection;
  private channel!: Channel;
  private userAdapter: UserAdapterInterface;
  private organizationAdapter: OrganizationAdapterInterface;

  constructor(
    @inject(TYPES.UserAdapterInterface) userAdapter: UserAdapterInterface,
    @inject(TYPES.OrganizationAdapterInterface)
    organizationAdapter: OrganizationAdapterInterface
  ) {
    this.userAdapter = userAdapter;
    this.organizationAdapter = organizationAdapter;
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

  async consumeSubscriptionUpdates(queue: string) {
    consumeSubscriptionUpdates(this.channel, queue, this.organizationAdapter);
  }

  async sendDataToQueue(queue: string, data: any) {
    SendDataToQueue(this.channel, this.connection, queue, data);
  }
}
