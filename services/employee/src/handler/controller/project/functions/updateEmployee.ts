import { Request, Response } from "express";
import { EmployeeUseCaseInterface } from "../../../../interface/employee/EmployeeUseCaseInterface";
import { Employee } from "../../../../Entities/Employee";
import { validateJwt } from "../../../../util/JWT/validate.jwt";
import { QUEUES } from "../../../../constants/types/queue";
import { RabbitMQUseCaseInterface } from "../../../../interface/rabbitmq/RabbitMQUseCaseInterface";
import getAccessToken from "../../../../util/validation/getAccessToken";

export const updateEmployee = async (
  req: Request,
  res: Response,
  iEmployeeUseCase: EmployeeUseCaseInterface,
  iRabbitMQUseCase: RabbitMQUseCaseInterface
) => {
  try {
    const access_token = getAccessToken(req);

    const data = validateJwt(access_token);
    const employee = req.body as Employee;

    let updatedEmployee = await iEmployeeUseCase.updateEmployee(
      data.user,
      employee
    );
    if (!updatedEmployee) {
      throw Error("No employee found");
    }

    iRabbitMQUseCase.sendDataToQueue(QUEUES.EMPLOYEECREATION, updatedEmployee);
    iRabbitMQUseCase.sendDataToQueue(
      QUEUES.PROJECT_USER_CREATION,
      updatedEmployee
    );
    iRabbitMQUseCase.sendDataToQueue(
      QUEUES.CHAT_MEETING_USER_CREATION,
      updatedEmployee
    );

    return res.status(200).json({
      employee: updatedEmployee,
      success: true,
      message: "Employee successfully Fetched",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
