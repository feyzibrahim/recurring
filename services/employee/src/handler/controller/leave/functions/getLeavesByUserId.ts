import { Request, Response } from "express";
import { LeaveUseCaseInterface } from "../../../../interface/leave/LeaveUseCaseInterface";
import simpleQueryFilter from "../../../../util/filters/simpleQueryFilter";

export const getLeavesByUserId = async (
  req: Request,
  res: Response,
  iLeaveUseCase: LeaveUseCaseInterface
) => {
  try {
    const { userSlug } = req.params;

    const { filter } = simpleQueryFilter(req);

    let leaves = await iLeaveUseCase.getLeavesByUserId(userSlug, filter);
    if (!leaves) {
      throw Error("No leave found");
    }

    return res.status(200).json({
      leaves: leaves,
      success: true,
      message: "Leave successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
