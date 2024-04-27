import { Request, Response } from "express";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import { LeavePolicyUseCaseInterface } from "../../../../interface/leavePolicy/LeavePolicyUseCaseInterface";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const getLeavePolicy = async (
  req: Request,
  res: Response,
  iLeaveUseCase: LeavePolicyUseCaseInterface
) => {
  try {
    const access_token = getAccessToken(req);
    const data = validateJwt(access_token);

    let leavePolicy = await iLeaveUseCase.getLeavePolicy(data.organization);
    if (!leavePolicy) {
      throw Error("No leavePolicy found");
    }

    return res.status(200).json({
      leavePolicy: leavePolicy,
      success: true,
      message: "Leave successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
