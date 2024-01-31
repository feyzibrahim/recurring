import { Request, Response } from "express";
import { EmployeeUseCaseInterface } from "../../../../interface/employee/EmployeeUseCaseInterface";
import { Employee } from "../../../../Entities/Employee";
import { validateJwt } from "../../../../util/JWT/validate.jwt";

export const createEmployee = async (
  req: Request,
  res: Response,
  iEmployeeUseCase: EmployeeUseCaseInterface
) => {
  try {
    let body = req.body as Employee;

    const { access_token } = req.cookies;

    const data = validateJwt(access_token);

    // let project = await iEmployeeUseCase.getEmployeeByUserId(data.user);
    // if (project) {
    //   throw Error("Employee Already Exists");
    // }

    body.organization = data.organization;

    let org = (await iEmployeeUseCase.createEmployee(body)) as Employee;

    return res.status(200).json({
      project: org,
      success: true,
      message: "Employee successfully Created",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
