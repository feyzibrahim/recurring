import { LeavePolicy } from "../../../../../Entities/LeavePolicy";
import LeavePolicyModal from "../../Modal/LeavePolicyModel";

export const createLeavePolicy = async (leavePolicy: LeavePolicy) => {
  try {
    const newLeavePolicy = await LeavePolicyModal.create(leavePolicy);
    return newLeavePolicy;
  } catch (error) {
    console.log("LeavePolicyAdapter: createLeavePolicy -> error", error);
    return false;
  }
};
