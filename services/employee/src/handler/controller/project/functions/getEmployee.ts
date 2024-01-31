import { Request, Response } from "express";
import { EmployeeUseCaseInterface } from "../../../../interface/employee/EmployeeUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";

export const getEmployee = async (
  req: Request,
  res: Response,
  iEmployeeUseCAse: EmployeeUseCaseInterface
) => {
  try {
    const { access_token } = req.cookies;

    const data = validateJwt(access_token);

    let org = await iEmployeeUseCAse.getEmployeeByUserId(data.user);
    if (!org) {
      throw Error("No project found");
    }

    return res.status(200).json({
      project: org,
      success: true,
      message: "Employee successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
