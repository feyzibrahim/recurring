import { Leave } from "../../Entities/Leave";
import { SimpleFilter } from "../../constants/props/SimpleFilter";

export interface LeaveUseCaseInterface {
  getLeave(id: string): Promise<Leave | boolean>;
  getLeaves(organization: string): Promise<Leave[] | boolean>;
  getLeavesByUserId(
    userId: string,
    filter: SimpleFilter
  ): Promise<Leave[] | boolean>;
  createLeave(leave: Leave): Promise<Leave | boolean>;
  updateLeave(leave: Leave): Promise<Leave | boolean>;
}
