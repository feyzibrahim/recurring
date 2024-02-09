import { inject, injectable } from "inversify";
import amqp, { Channel, Connection } from "amqplib";
import { UserAdapterInterface } from "../../interface/user/UserAdapterInterface";
import { TYPES } from "../../constants/types/types";
import { User } from "../../Entities/User";

@injectable()
export class RabbitMQService {
  private connection!: Connection;
  private channel!: Channel;
  private userAdapter: UserAdapterInterface;

  constructor(
    @inject(TYPES.UserAdapterInterface) userAdapter: UserAdapterInterface
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
    try {
      await this.channel.assertQueue(queue);
      this.channel.consume(queue, async (data) => {
        if (data) {
          const response = Buffer.from(data.content).toString();
          const user = JSON.parse(response) as User;

          await this.userAdapter.updateUser(user);

          this.channel.ack(data);
        }
      });
    } catch (error) {
      console.error("Error consuming messages:", error);
    }
  }
}
