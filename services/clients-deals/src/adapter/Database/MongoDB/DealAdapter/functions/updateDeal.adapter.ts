import { Deal } from "../../../../../Entities/Deal";
import DealModal from "../../Modal/DealModel";

export const updateDeal = async (client: Deal) => {
  try {
    await DealModal.updateOne({ slug: client.slug }, { ...client });

    const newDeal = await DealModal.findOne({ slug: client.slug }).populate(
      "client",
      "details"
    );
    return newDeal as Deal;
  } catch (error) {
    console.log("DealAdapter: updateDeal -> error", error);
    return false;
  }
};
