import { Request, Response } from "express";
import { EmployeeUseCaseInterface } from "../../../../interface/employee/EmployeeUseCaseInterface";

export const getEmployee = async (
  req: Request,
  res: Response,
  iEmployeeUseCAse: EmployeeUseCaseInterface
) => {
  try {
    const { id } = req.params;

    let employee = await iEmployeeUseCAse.getEmployee(id);
    if (!employee) {
      throw Error("No employee found");
    }

    return res.status(200).json({
      employee: employee,
      success: true,
      message: "Employee successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
