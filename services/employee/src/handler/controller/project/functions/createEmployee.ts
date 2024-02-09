import { Request, Response } from "express";
import { EmployeeUseCaseInterface } from "../../../../interface/employee/EmployeeUseCaseInterface";
import { Employee } from "../../../../Entities/Employee";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import { sendDataToQueue } from "../../../../infra/rabbitMQ/sendDataToQueue";
import { QUEUES } from "../../../../constants/types/queue";

export const createEmployee = async (
  req: Request,
  res: Response,
  iEmployeeUseCase: EmployeeUseCaseInterface
) => {
  try {
    let body = req.body as Employee;

    const { access_token } = req.cookies;

    const data = validateJwt(access_token);

    body.organization = data.organization;

    let employee = (await iEmployeeUseCase.createEmployee(body)) as Employee;

    sendDataToQueue(QUEUES.EMPLOYEECREATION, employee);
    sendDataToQueue(QUEUES.PROJECT_USER_CREATION, employee);

    return res.status(200).json({
      employee: employee,
      success: true,
      message: "Employee successfully Created",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
