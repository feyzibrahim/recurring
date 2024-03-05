import { Channel } from "amqplib";
import { Organization } from "../../../Entities/Organization";
import { OrganizationAdapterInterface } from "../../../interface/organization/OrganizationAdapterInterface";

export const consumeSubscriptionUpdates = async (
  channel: Channel,
  queue: string,
  organizationAdapter: OrganizationAdapterInterface
) => {
  try {
    await channel.assertQueue(queue);
    channel.consume(queue, async (data) => {
      if (data) {
        const response = Buffer.from(data.content).toString();
        const organization = JSON.parse(response) as Organization;
        console.log(
          "file: ConsumeSubscriptionUpdates.ts:16 -> channel.consume -> organization",
          organization
        );

        await organizationAdapter.updateOrganization(
          organization._id,
          organization
        );

        channel.ack(data);
      }
    });
  } catch (error) {
    console.error("Error consuming messages:", error);
  }
};
