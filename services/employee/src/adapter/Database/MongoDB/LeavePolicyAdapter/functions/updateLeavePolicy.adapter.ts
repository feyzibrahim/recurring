import { LeavePolicy } from "../../../../../Entities/LeavePolicy";
import LeavePolicyModal from "../../Modal/LeavePolicyModel";

export const updateLeavePolicy = async (leavePolicy: LeavePolicy) => {
  try {
    const updatedLeavePolicy = await LeavePolicyModal.findOneAndUpdate(
      { _id: leavePolicy._id },
      { $set: leavePolicy },
      { new: true }
    );

    return updatedLeavePolicy as LeavePolicy;
  } catch (error) {
    console.log("LeavePolicyAdapter: updateLeavePolicy -> error", error);
    return false;
  }
};
