import { Deal } from "../../../../../Entities/Deal";
import DealModal from "../../Modal/DealModel";

export const updateDeal = async (client: Deal) => {
  try {
    const newDeal = await DealModal.findOneAndUpdate({ _id: client._id });
    return newDeal as Deal;
  } catch (error) {
    console.log("DealAdapter: updateDeal -> error", error);
    return false;
  }
};
