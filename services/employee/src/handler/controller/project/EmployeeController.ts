import { Request, Response } from "express";
import {
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
} from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../../../constants/types/types";
import { EmployeeUseCaseInterface } from "../../../interface/employee/EmployeeUseCaseInterface";
import { createEmployee } from "./functions/createEmployee";
import { updateEmployee } from "./functions/updateEmployee";
import { getEmployees } from "./functions/getEmployees";
import { getEmployee } from "./functions/getEmployee";
import { deleteEmployee } from "./functions/deleteEmployee";
import { getEmployeesWithRole } from "./functions/getEmployeesWithRole";
import { sendEmployeeInvitation } from "./functions/sendEmployeeInvitation";
import { RabbitMQUseCaseInterface } from "../../../interface/rabbitmq/RabbitMQUseCaseInterface";
import { terminateEmployee } from "./functions/terminateEmployee";
import { getExEmployees } from "./functions/getExEmployees";
import { requireAuth } from "../../middleware/AuthMiddleware";

@controller("/api/employee", requireAuth)
export class EmployeeController {
  constructor(
    @inject(TYPES.EmployeeUseCaseInterface)
    private iEmployeeUseCase: EmployeeUseCaseInterface,
    @inject(TYPES.RabbitMQUseCaseInterface)
    private iRabbitMQUseCase: RabbitMQUseCaseInterface
  ) {}

  @httpGet("/")
  async getEmployees(req: Request, res: Response) {
    await getEmployees(req, res, this.iEmployeeUseCase);
  }
  @httpGet("/ex")
  async getExEmployees(req: Request, res: Response) {
    await getExEmployees(req, res, this.iEmployeeUseCase);
  }

  @httpGet("/with-role")
  async getEmployeesWithRole(req: Request, res: Response) {
    await getEmployeesWithRole(req, res, this.iEmployeeUseCase);
  }

  @httpGet("/employee-send-verification-email/:id")
  async sendEmployeeInvitation(req: Request, res: Response) {
    await sendEmployeeInvitation(req, res, this.iEmployeeUseCase);
  }

  @httpGet("/:id")
  async getEmployee(req: Request, res: Response) {
    await getEmployee(req, res, this.iEmployeeUseCase);
  }

  @httpPost("/")
  async createEmployee(req: Request, res: Response) {
    await createEmployee(
      req,
      res,
      this.iEmployeeUseCase,
      this.iRabbitMQUseCase
    );
  }
  @httpPost("/terminate/:id")
  async terminateEmployee(req: Request, res: Response) {
    await terminateEmployee(
      req,
      res,
      this.iEmployeeUseCase,
      this.iRabbitMQUseCase
    );
  }

  @httpPatch("/")
  async updateEmployee(req: Request, res: Response) {
    await updateEmployee(
      req,
      res,
      this.iEmployeeUseCase,
      this.iRabbitMQUseCase
    );
  }

  @httpDelete("/:id")
  async deleteEmployee(req: Request, res: Response) {
    await deleteEmployee(req, res, this.iEmployeeUseCase);
  }
}
