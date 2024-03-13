import { Request, Response } from "express";
import { LeavePolicyUseCaseInterface } from "../../../../interface/leavePolicy/LeavePolicyUseCaseInterface";
import { LeavePolicy } from "../../../../Entities/LeavePolicy";

export const updateLeavePolicy = async (
  req: Request,
  res: Response,
  iLeaveUseCase: LeavePolicyUseCaseInterface
) => {
  try {
    const leave = req.body as LeavePolicy;

    let updateLeave = await iLeaveUseCase.updateLeavePolicy(leave);
    if (!updateLeave) {
      throw Error("No leave found");
    }

    return res.status(200).json({
      leave: updateLeave,
      success: true,
      message: "Leave successfully Updated",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
