import { injectable } from "inversify";
import { Leave } from "../../../../Entities/Leave";
import { createLeave } from "./functions/createLeave.adapter";
import { LeaveAdapterInterface } from "../../../../interface/leave/LeaveAdapterInterface";
import { getLeavesByUserId } from "./functions/getLeavesByUserId.adapter";
import { SimpleFilter } from "../../../../constants/props/SimpleFilter";
import { getLeaves } from "./functions/getLeaves.adapter";
import { updateLeave } from "./functions/updateLeave.adapter";

@injectable()
export class LeaveAdapter implements LeaveAdapterInterface {
  getLeave(id: string): Promise<boolean | Leave> {
    throw new Error("Method not implemented.");
  }
  getLeaves(organization: string): Promise<boolean | Leave[]> {
    return getLeaves(organization);
  }

  async createLeave(Leave: Leave): Promise<boolean | Leave> {
    return createLeave(Leave);
  }

  async getLeavesByUserId(
    userId: string,
    filter: SimpleFilter
  ): Promise<boolean | Leave[]> {
    return getLeavesByUserId(userId, filter);
  }
  async updateLeave(leave: Leave): Promise<boolean | Leave> {
    return updateLeave(leave);
  }
}
