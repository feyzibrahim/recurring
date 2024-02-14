import { Leave } from "../../../../../Entities/Leave";
import LeaveModal from "../../Modal/LeaveModel";

export const updateLeave = async (leave: Leave) => {
  try {
    const updatedLeave = await LeaveModal.findOneAndUpdate(
      { _id: leave._id },
      { $set: leave },
      { new: true }
    );

    return updatedLeave as Leave;
  } catch (error) {
    console.log("LeaveAdapter: updateLeave -> error", error);
    return false;
  }
};
