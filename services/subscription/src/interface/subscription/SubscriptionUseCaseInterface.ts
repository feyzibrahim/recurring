import { Subscription } from "../../Entities/Subscription";

export interface SubscriptionUseCaseInterface {
  getSubscription(organizationId: string): Promise<Subscription | boolean>;
  getSubscriptionByUserId(userId: string): Promise<Subscription | boolean>;
  createSubscription(
    subscription: Subscription
  ): Promise<Subscription | boolean>;
  updateSubscription(
    id: string,
    subscription: Subscription
  ): Promise<Subscription | boolean>;
}
