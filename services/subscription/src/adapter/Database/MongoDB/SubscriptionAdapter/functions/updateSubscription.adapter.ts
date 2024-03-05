import { Subscription } from "../../../../../Entities/Subscription";
import SubscriptionModal from "../../Modal/SubscriptionModal";

export const updateSubscription = async (
  organizationId: string,
  subscription: Subscription
) => {
  try {
    const subscriptionUpdated = await SubscriptionModal.findOneAndUpdate(
      { organization: organizationId },
      { $set: { ...subscription } },
      { new: true }
    );
    return subscriptionUpdated as Subscription;
  } catch (error) {
    console.log(
      "updateSubscriptionAdapter: updateSubscription -> error",
      error
    );
    return false;
  }
};
