import { injectable } from "inversify";
import { LeavePolicy } from "../../../../Entities/LeavePolicy";
import { createLeavePolicy } from "./functions/createLeavePolicy.adapter";
import { updateLeavePolicy } from "./functions/updateLeavePolicy.adapter";
import { LeavePolicyAdapterInterface } from "../../../../interface/leavePolicy/LeavePolicyAdapterInterface";
import { getLeavePolicy } from "./functions/geLeavePolicy.adapter";

@injectable()
export class LeavePolicyAdapter implements LeavePolicyAdapterInterface {
  getLeavePolicy(organization: string): Promise<boolean | LeavePolicy> {
    return getLeavePolicy(organization);
  }

  async createLeavePolicy(
    leavePolicy: LeavePolicy
  ): Promise<boolean | LeavePolicy> {
    return createLeavePolicy(leavePolicy);
  }

  async updateLeavePolicy(
    leavePolicy: LeavePolicy
  ): Promise<boolean | LeavePolicy> {
    return updateLeavePolicy(leavePolicy);
  }
}
