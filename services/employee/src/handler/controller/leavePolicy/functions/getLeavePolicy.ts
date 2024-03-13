import { Request, Response } from "express";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import { LeavePolicyUseCaseInterface } from "../../../../interface/leavePolicy/LeavePolicyUseCaseInterface";

export const getLeavePolicy = async (
  req: Request,
  res: Response,
  iLeaveUseCase: LeavePolicyUseCaseInterface
) => {
  try {
    const { access_token } = req.cookies;
    const data = validateJwt(access_token);

    let leaves = await iLeaveUseCase.getLeavePolicy(data.organization);
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
