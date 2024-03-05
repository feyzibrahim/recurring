import { injectable } from "inversify";
import { Subscription } from "../../../../Entities/Subscription";
import { createSubscription } from "./functions/createSubscription.adapter";
import { getSubscription } from "./functions/getSubscription.adapter";
import { SubscriptionAdapterInterface } from "../../../../interface/subscription/SubscriptionAdapterInterface";
import { updateSubscription } from "./functions/updateSubscription.adapter";

@injectable()
export class SubscriptionAdapter implements SubscriptionAdapterInterface {
  async getSubscription(id: string): Promise<boolean | Subscription> {
    return getSubscription(id);
  }

  async createSubscription(
    Subscription: Subscription
  ): Promise<boolean | Subscription> {
    return createSubscription(Subscription);
  }

  async getSubscriptionByOrganizationId(
    organizationId: string
  ): Promise<boolean | Subscription> {
    return getSubscription(organizationId);
  }
  async updateSubscription(
    organizationId: string,
    subscription: Subscription
  ): Promise<boolean | Subscription> {
    return updateSubscription(organizationId, subscription);
  }
}
