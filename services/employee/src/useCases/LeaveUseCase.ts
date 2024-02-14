import { inject, injectable } from "inversify";
import { LeaveUseCaseInterface } from "../interface/leave/LeaveUseCaseInterface";
import { TYPES } from "../constants/types/types";
import { Leave } from "../Entities/Leave";
import { SimpleFilter } from "../constants/props/SimpleFilter";

@injectable()
export class LeaveUseCase implements LeaveUseCaseInterface {
  constructor(
    @inject(TYPES.LeaveAdapterInterface)
    private iLeaveUseCase: LeaveUseCaseInterface
  ) {}

  getLeave(id: string): Promise<boolean | Leave> {
    throw new Error("Method not implemented.");
  }
  getLeaves(organization: string): Promise<boolean | Leave[]> {
    return this.iLeaveUseCase.getLeaves(organization);
  }

  getLeavesByUserId(
    userId: string,
    filter: SimpleFilter
  ): Promise<boolean | Leave[]> {
    return this.iLeaveUseCase.getLeavesByUserId(userId, filter);
  }
  createLeave(leave: Leave): Promise<boolean | Leave> {
    return this.iLeaveUseCase.createLeave(leave);
  }
  updateLeave(leave: Leave): Promise<boolean | Leave> {
    return this.iLeaveUseCase.updateLeave(leave);
  }
}
