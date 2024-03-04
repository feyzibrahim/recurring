import { Subscription } from "../../../../../Entities/Subscription";
import SubscriptionModal from "../../Modal/SubscriptionModal";

export const createSubscription = async (project: Subscription) => {
  try {
    const Subscription = await SubscriptionModal.create(project);
    return Subscription;
  } catch (error) {
    console.log(
      "createSubscriptionAdapter: createSubscription -> error",
      error
    );
    return false;
  }
};
