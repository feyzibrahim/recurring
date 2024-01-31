import { Request, Response } from "express";
import { EmployeeUseCaseInterface } from "../../../../interface/employee/EmployeeUseCaseInterface";
import { Employee } from "../../../../Entities/Employee";
import { validateJwt } from "../../../../util/JWT/validate.jwt";

export const updateEmployee = async (
  req: Request,
  res: Response,
  iOrgUseCase: EmployeeUseCaseInterface
) => {
  try {
    const { access_token } = req.cookies;

    const data = validateJwt(access_token);
    const project = req.body as Employee;
    console.log("updateEmployee: project", project);

    let org = await iOrgUseCase.updateEmployee(data.user, project);
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
