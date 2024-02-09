import { Request, Response } from "express";
import { EmployeeUseCaseInterface } from "../../../../interface/employee/EmployeeUseCaseInterface";
import { Employee } from "../../../../Entities/Employee";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import { sendDataToQueue } from "../../../../infra/rabbitMQ/sendDataToQueue";
import { QUEUES } from "../../../../constants/types/queue";

export const updateEmployee = async (
  req: Request,
  res: Response,
  iEmployeeUseCase: EmployeeUseCaseInterface
) => {
  try {
    const { access_token } = req.cookies;

    const data = validateJwt(access_token);
    const employee = req.body as Employee;

    let updatedEmployee = await iEmployeeUseCase.updateEmployee(
      data.user,
      employee
    );
    if (!updatedEmployee) {
      throw Error("No employee found");
    }

    sendDataToQueue(QUEUES.EMPLOYEECREATION, employee);
    sendDataToQueue(QUEUES.PROJECT_USER_CREATION, employee);

    return res.status(200).json({
      employee: updatedEmployee,
      success: true,
      message: "Employee successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
