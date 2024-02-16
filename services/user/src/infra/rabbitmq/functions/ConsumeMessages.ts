import { Channel } from "amqplib";
import { User } from "../../../Entities/User";
import { UserAdapterInterface } from "../../../interface/user/UserAdapterInterface";

export const consumeMessages = async (
  channel: Channel,
  queue: string,
  userAdapter: UserAdapterInterface
) => {
  try {
    await channel.assertQueue(queue);
    channel.consume(queue, async (data) => {
      if (data) {
        const response = Buffer.from(data.content).toString();
        const employee = JSON.parse(response) as User;

        await userAdapter.updateUser(employee);

        channel.ack(data);
      }
    });
  } catch (error) {
    console.error("Error consuming messages:", error);
  }
};
