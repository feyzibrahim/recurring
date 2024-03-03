import { Activity } from "../../../../../Entities/Activity";
import { Deal } from "../../../../../Entities/Deal";
import DealModal from "../../Modal/DealModel";

export const addActivity = async (slug: string, activity: Activity) => {
  try {
    await DealModal.updateOne(
      { slug: slug },
      { $push: { activity: activity } }
    );

    const newDeal = await DealModal.findOne({ slug: slug }).populate(
      "client",
      "details"
    );
    return newDeal as Deal;
  } catch (error) {
    console.log("DealAdapter: addActivity -> error", error);
    return false;
  }
};
