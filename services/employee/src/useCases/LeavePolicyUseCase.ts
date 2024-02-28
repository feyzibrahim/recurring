import { inject, injectable } from "inversify";
import { LeavePolicyUseCaseInterface } from "../interface/leavePolicy/LeavePolicyUseCaseInterface";
import { TYPES } from "../constants/types/types";
import { LeavePolicy } from "../Entities/LeavePolicy";

@injectable()
export class LeavePolicyUseCase implements LeavePolicyUseCaseInterface {
  constructor(
    @inject(TYPES.LeavePolicyAdapterInterface)
    private iLeavePolicyUseCase: LeavePolicyUseCaseInterface
  ) {}

  getLeavePolicy(organization: string): Promise<boolean | LeavePolicy> {
    return this.iLeavePolicyUseCase.getLeavePolicy(organization);
  }

  createLeavePolicy(leavePolicy: LeavePolicy): Promise<boolean | LeavePolicy> {
    return this.iLeavePolicyUseCase.createLeavePolicy(leavePolicy);
  }
  updateLeavePolicy(leavePolicy: LeavePolicy): Promise<boolean | LeavePolicy> {
    return this.iLeavePolicyUseCase.updateLeavePolicy(leavePolicy);
  }
}
