import { Subscription } from "../../Entities/Subscription";

export interface SubscriptionAdapterInterface {
  getSubscription(id: string): Promise<Subscription | boolean>;
  getSubscriptionByOrganizationId(
    organizationId: string
  ): Promise<Subscription | boolean>;
  deleteSubscription(organizationId: string): Promise<Subscription | boolean>;
  createSubscription(
    subscription: Subscription
  ): Promise<Subscription | boolean>;
  updateSubscription(
    id: string,
    subscription: Subscription
  ): Promise<Subscription | boolean>;
}
