import { Request, Response } from "express";
import { EmployeeUseCaseInterface } from "../../../../interface/employee/EmployeeUseCaseInterface";
import { validateJwt } from "../../../../util/JWT/validate.jwt";

export const getExEmployees = async (
  req: Request,
  res: Response,
  iEmployeeUseCAse: EmployeeUseCaseInterface
) => {
  try {
    const { access_token } = req.cookies;

    const data = validateJwt(access_token);

    let employees = await iEmployeeUseCAse.getExEmployees(data.organization);
    if (!employees) {
      throw Error("No employee found");
    }

    return res.status(200).json({
      employees: employees,
      success: true,
      message: "Ex Employees successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
