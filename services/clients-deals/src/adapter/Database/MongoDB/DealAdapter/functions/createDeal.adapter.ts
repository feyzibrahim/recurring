import { Deal } from "../../../../../Entities/Deal";
import DealModal from "../../Modal/DealModel";

export const createDeal = async (client: Deal) => {
  try {
    const newDeal = await DealModal.create(client);
    return newDeal;
  } catch (error) {
    console.log("DealAdapter: createDeal -> error", error);
    return false;
  }
};
