import { Leave } from "../../../../../Entities/Leave";
import LeaveModal from "../../Modal/LeaveModel";

export const createLeave = async (leave: Leave) => {
  try {
    const newLeave = await LeaveModal.create(leave);
    return newLeave;
  } catch (error) {
    console.log("LeaveAdapter: createLeave -> error", error);
    return false;
  }
};
