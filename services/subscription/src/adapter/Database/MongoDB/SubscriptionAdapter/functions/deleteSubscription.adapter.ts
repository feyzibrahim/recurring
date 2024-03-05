import { Subscription } from "../../../../../Entities/Subscription";
import SubscriptionModal from "../../Modal/SubscriptionModal";

export const deleteSubscription = async (organizationId: string) => {
  try {
    const subscription = await SubscriptionModal.findOneAndDelete({
      organization: organizationId,
    });
    return subscription as Subscription;
  } catch (error) {
    console.log("SubscriptionAdapter: deleteSubscription -> error", error);
    return false;
  }
};
