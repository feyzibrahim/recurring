import { Request, Response } from "express";
import { LeaveUseCaseInterface } from "../../../../interface/leave/LeaveUseCaseInterface";
import { Leave } from "../../../../Entities/Leave";

export const updateLeave = async (
  req: Request,
  res: Response,
  iLeaveUseCase: LeaveUseCaseInterface
) => {
  try {
    const leave = req.body as Leave;

    let updateLeave = await iLeaveUseCase.updateLeave(leave);
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
