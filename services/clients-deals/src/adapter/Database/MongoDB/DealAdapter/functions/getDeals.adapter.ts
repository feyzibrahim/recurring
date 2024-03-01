import { Deal } from "../../../../../Entities/Deal";
import DealModal from "../../Modal/DealModel";

export const getDeals = async (organizationId: string) => {
  try {
    const project = await DealModal.find({
      organization: organizationId,
    }).populate("client", "details");
    return project as Deal[];
  } catch (error) {
    console.log("DealAdapter: getDeals -> error", error);
    return false;
  }
};
