import { Leave } from "../../../../../Entities/Leave";
import LeaveModal from "../../Modal/LeaveModel";

export const getLeaves = async (organizationId: string) => {
  try {
    const leaves = await LeaveModal.find({ organization: organizationId });
    return leaves as Leave[];
  } catch (error) {
    console.log("LeaveAdapter: getLeaves -> error", error);
    return false;
  }
};
