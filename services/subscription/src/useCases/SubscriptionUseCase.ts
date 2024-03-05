import { inject, injectable } from "inversify";
import { SubscriptionUseCaseInterface } from "../interface/subscription/SubscriptionUseCaseInterface";
import { TYPES } from "../constants/types/types";
import { Subscription } from "../Entities/Subscription";

@injectable()
export class SubscriptionUseCase implements SubscriptionUseCaseInterface {
  constructor(
    @inject(TYPES.SubscriptionAdapterInterface)
    private iSubscriptionUseCase: SubscriptionUseCaseInterface
  ) {}
  getSubscription(organizationId: string): Promise<boolean | Subscription> {
    return this.iSubscriptionUseCase.getSubscription(organizationId);
  }
  getSubscriptionByOrganizationId(
    organizationId: string
  ): Promise<boolean | Subscription> {
    return this.iSubscriptionUseCase.getSubscriptionByOrganizationId(
      organizationId
    );
  }
  deleteSubscription(organizationId: string): Promise<boolean | Subscription> {
    return this.iSubscriptionUseCase.deleteSubscription(organizationId);
  }
  createSubscription(
    subscription: Subscription
  ): Promise<boolean | Subscription> {
    return this.iSubscriptionUseCase.createSubscription(subscription);
  }
  updateSubscription(
    id: string,
    subscription: Subscription
  ): Promise<boolean | Subscription> {
    return this.iSubscriptionUseCase.updateSubscription(id, subscription);
  }
}
