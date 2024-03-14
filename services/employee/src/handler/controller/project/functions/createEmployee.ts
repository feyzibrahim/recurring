import { Request, Response } from "express";
import { EmployeeUseCaseInterface } from "../../../../interface/employee/EmployeeUseCaseInterface";
import { Employee } from "../../../../Entities/Employee";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import { QUEUES } from "../../../../constants/types/queue";
import { RabbitMQUseCaseInterface } from "../../../../interface/rabbitmq/RabbitMQUseCaseInterface";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const createEmployee = async (
  req: Request,
  res: Response,
  iEmployeeUseCase: EmployeeUseCaseInterface,
  iRabbitMQUseCase: RabbitMQUseCaseInterface
) => {
  try {
    let body = req.body as Employee;

    const access_token = getAccessToken(req);

    const data = validateJwt(access_token);

    body.organization = data.organization;

    let employee = (await iEmployeeUseCase.createEmployee(body)) as Employee;

    iRabbitMQUseCase.sendDataToQueue(QUEUES.EMPLOYEECREATION, employee);
    iRabbitMQUseCase.sendDataToQueue(QUEUES.PROJECT_USER_CREATION, employee);
    iRabbitMQUseCase.sendDataToQueue(
      QUEUES.CHAT_MEETING_USER_CREATION,
      employee
    );

    return res.status(200).json({
      employee: employee,
      success: true,
      message: "Employee successfully Created",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
