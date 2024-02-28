import { LeavePolicy } from "../../Entities/LeavePolicy";

export interface LeavePolicyAdapterInterface {
  getLeavePolicy(organization: string): Promise<LeavePolicy | boolean>;
  createLeavePolicy(leave: LeavePolicy): Promise<LeavePolicy | boolean>;
  updateLeavePolicy(leave: LeavePolicy): Promise<LeavePolicy | boolean>;
}
