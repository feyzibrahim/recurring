import { Request, Response } from "express";
import { LeaveUseCaseInterface } from "../../../../interface/leave/LeaveUseCaseInterface";
import simpleQueryFilter from "../../../../util/filters/simpleQueryFilter";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const getLeavesForUser = async (
  req: Request,
  res: Response,
  iLeaveUseCase: LeaveUseCaseInterface
) => {
  try {
    const access_token = getAccessToken(req);
    const data = validateJwt(access_token);

    const { filter } = simpleQueryFilter(req);

    let leaves = await iLeaveUseCase.getLeavesByUserId(data.user, filter);
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
