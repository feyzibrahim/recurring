import { Request, Response } from "express";
import { LeavePolicyUseCaseInterface } from "../../../../interface/leavePolicy/LeavePolicyUseCaseInterface";
import { LeavePolicy } from "../../../../Entities/LeavePolicy";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const createLeavePolicy = async (
  req: Request,
  res: Response,
  iLeavePolicyUseCase: LeavePolicyUseCaseInterface
) => {
  try {
    const body = req.body as LeavePolicy;

    const access_token = getAccessToken(req);
    const data = validateJwt(access_token);
    body.organization = data.organization;

    let leavePolicy = (await iLeavePolicyUseCase.createLeavePolicy(
      body
    )) as LeavePolicy;

    return res.status(200).json({
      leavePolicy: leavePolicy,
      success: true,
      message: "LeavePolicy successfully Applied",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
