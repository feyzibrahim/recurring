import { Request, Response } from "express";
import { LeaveUseCaseInterface } from "../../../../interface/leave/LeaveUseCaseInterface";

export const getLeave = async (
  req: Request,
  res: Response,
  iLeaveUseCase: LeaveUseCaseInterface
) => {
  try {
    const { leaveSlug } = req.params;

    let leave = await iLeaveUseCase.getLeave(leaveSlug);
    if (!leave) {
      throw Error("No leave found");
    }

    return res.status(200).json({
      leave: leave,
      success: true,
      message: "Leave successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
