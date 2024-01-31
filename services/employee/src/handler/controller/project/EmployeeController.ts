import { Request, Response } from "express";
import {
  controller,
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

@controller("/api/employee")
export class EmployeeController {
  constructor(
    @inject(TYPES.EmployeeUseCaseInterface)
    private iOrgUseCase: EmployeeUseCaseInterface
  ) {}

  @httpGet("/")
  async getEmployees(req: Request, res: Response) {
    await getEmployees(req, res, this.iOrgUseCase);
  }

  @httpPost("/")
  async createEmployee(req: Request, res: Response) {
    await createEmployee(req, res, this.iOrgUseCase);
  }

  @httpPatch("/")
  async updateEmployee(req: Request, res: Response) {
    await updateEmployee(req, res, this.iOrgUseCase);
  }
}
