import { Request, Response } from "express";
import { EmployeeUseCaseInterface } from "../../../../interface/employee/EmployeeUseCaseInterface";
import { Employee } from "../../../../Entities/Employee";
import { QUEUES } from "../../../../constants/types/queue";
import { RabbitMQUseCaseInterface } from "../../../../interface/rabbitmq/RabbitMQUseCaseInterface";

export const terminateEmployee = async (
  req: Request,
  res: Response,
  iEmployeeUseCase: EmployeeUseCaseInterface,
  iRabbitMQUseCase: RabbitMQUseCaseInterface
) => {
  try {
    let { id } = req.params;

    let body = req.body as Employee;
    body._id = id;

    let employee = (await iEmployeeUseCase.terminateEmployee(body)) as Employee;

    iRabbitMQUseCase.sendDataToQueue(QUEUES.EMPLOYEECREATION, employee);
    iRabbitMQUseCase.sendDataToQueue(QUEUES.PROJECT_USER_CREATION, employee);
    iRabbitMQUseCase.sendDataToQueue(
      QUEUES.CHAT_MEETING_USER_CREATION,
      employee
    );

    return res.status(200).json({
      employee: employee,
      success: true,
      message: "Employee successfully Terminated",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
