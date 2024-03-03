import { Activity } from "../../../../../Entities/Activity";
import { Deal } from "../../../../../Entities/Deal";
import DealModal from "../../Modal/DealModel";

export const editActivity = async (slug: string, activity: Activity) => {
  try {
    await DealModal.updateOne(
      { slug: slug, "activity._id": activity._id },
      {
        $set: {
          "activity.$.title": activity.title,
          "activity.$.description": activity.description,
        },
      }
    );

    const newDeal = await DealModal.findOne({ slug: slug }).populate(
      "client",
      "details"
    );
    return newDeal as Deal;
  } catch (error) {
    console.log("DealAdapter: editActivity -> error", error);
    return false;
  }
};
