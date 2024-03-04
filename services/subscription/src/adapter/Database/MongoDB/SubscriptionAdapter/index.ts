import { injectable } from "inversify";
import { Subscription } from "../../../../Entities/Subscription";
import { createSubscription } from "./functions/createSubscription.adapter";
import { getSubscription } from "./functions/getSubscription.adapter";
import { SubscriptionAdapterInterface } from "../../../../interface/subscription/SubscriptionAdapterInterface";

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

  async getSubscriptionByUserId(
    userId: string
  ): Promise<boolean | Subscription> {
    throw new Error("Method not implemented.");
  }
  async updateSubscription(
    id: string,
    project: Subscription
  ): Promise<boolean | Subscription> {
    throw new Error("Method not implemented.");
  }
}
