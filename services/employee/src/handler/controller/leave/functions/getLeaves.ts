import { Request, Response } from "express";
import { LeaveUseCaseInterface } from "../../../../interface/leave/LeaveUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const getLeaves = async (
  req: Request,
  res: Response,
  iLeaveUseCase: LeaveUseCaseInterface
) => {
  try {
    const access_token = getAccessToken(req);
    const data = validateJwt(access_token);

    let leaves = await iLeaveUseCase.getLeaves(data.organization);
    if (!leaves) {
      throw Error("No leaves found");
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
