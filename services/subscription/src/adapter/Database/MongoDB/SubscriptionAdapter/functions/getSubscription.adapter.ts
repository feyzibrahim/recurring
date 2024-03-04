import { Subscription } from "../../../../../Entities/Subscription";
import SubscriptionModal from "../../Modal/SubscriptionModal";

export const getSubscription = async (id: string) => {
  try {
    const subscription = await SubscriptionModal.findOne({ organization: id });
    return subscription as Subscription;
  } catch (error) {
    console.log("SubscriptionAdapter: getSubscription -> error", error);
    return false;
  }
};
