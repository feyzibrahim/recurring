import { Request, Response } from "express";
import { LeaveUseCaseInterface } from "../../../../interface/leave/LeaveUseCaseInterface";
import { Leave } from "../../../../Entities/Leave";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const createLeave = async (
  req: Request,
  res: Response,
  iLeaveUseCase: LeaveUseCaseInterface
) => {
  try {
    const body = req.body as Leave;

    const access_token = getAccessToken(req);

    const data = validateJwt(access_token);
    body.organization = data.organization;
    body.employeeId = data.user;

    let leave = (await iLeaveUseCase.createLeave(body)) as Leave;

    return res.status(200).json({
      leave: leave,
      success: true,
      message: "Leave successfully Applied",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
