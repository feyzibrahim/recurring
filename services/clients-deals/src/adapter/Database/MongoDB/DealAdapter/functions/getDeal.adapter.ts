import { Deal } from "../../../../../Entities/Deal";
import DealModal from "../../Modal/DealModel";

export const getDeal = async (slug: string) => {
  try {
    const project = await DealModal.findOne({ slug: slug });
    return project as Deal;
  } catch (error) {
    console.log("DealAdapter: getDeal -> error", error);
    return false;
  }
};
