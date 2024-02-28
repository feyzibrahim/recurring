import { LeavePolicy } from "../../../../../Entities/LeavePolicy";
import LeavePolicyModal from "../../Modal/LeavePolicyModel";

export const getLeavePolicy = async (organizationId: string) => {
  try {
    const leavePolicy = await LeavePolicyModal.findOne({
      organization: organizationId,
    });

    return leavePolicy as LeavePolicy;
  } catch (error) {
    console.log("LeavePolicyAdapter: getLeavePolicy -> error", error);
    return false;
  }
};
