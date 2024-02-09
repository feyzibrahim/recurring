import { Request, Response } from "express";
import { EmployeeUseCaseInterface } from "../../../../interface/employee/EmployeeUseCaseInterface";

export const deleteEmployee = async (
  req: Request,
  res: Response,
  iEmployeeUseCase: EmployeeUseCaseInterface
) => {
  try {
    let { id } = req.params;

    let employee = await iEmployeeUseCase.deleteEmployee(id);

    return res.status(200).json({
      employee: employee,
      success: true,
      message: "Employee successfully deleted",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
